export interface Event {
    name: String;
    startDate: Date;
    endDate: Date;
}

export interface Preferences {
    startTime?: Date;
    maxInterval?: number;
    blockTimes?: Event[];
}

export interface Job {
    name: String;
    estimatedTime: number;
    deadline: Date;
}

function changeTimezone(date: Date, ianatz: string = "Pacific/Auckland") {
    // suppose the date is 12:00 UTC
    var invdate = new Date(
        date.toLocaleString("en-US", {
            timeZone: ianatz,
        }),
    );

    // then invdate will be 07:00 in Toronto
    // and the diff is 5 hours
    var diff = date.getTime() - invdate.getTime();

    // so 12:00 in Toronto is 17:00 UTC
    return new Date(date.getTime() - diff); // needs to substract
}

export function formatCalendar(icsJSON: any): Event[] {
    let events = icsJSON[2].slice(1).map((x: any[]) => {
        let startDateIndex = -1;
        let endDateIndex = -1;

        for (var i = 0; i < x[1].length; i++) {
            if (x[1][i][0] == "dtstart") {
                startDateIndex = i;
            } else if (x[1][i][0] == "dtend") {
                endDateIndex = i;
            }
        }

        let event: Event = {
            name: x[0],
            startDate: changeTimezone(new Date(x[1][startDateIndex][3])),
            endDate: changeTimezone(new Date(x[1][endDateIndex][3])),
        };

        return event;
    });
    return events;
}

export function scheduleJobs(
    events: Event[],
    jobs: Job[],
    preferences: Preferences,
) {
    // configure current time
    let currentTime: number;
    if (preferences.startTime != null) {
        currentTime = changeTimezone(preferences.startTime).getTime();
    } else {
        let now = Date.now();
        currentTime = now - (now % 3600000) + 3600000;
    }

    // set the interval time
    const interval = preferences.maxInterval
        ? preferences.maxInterval * 3600000
        : 3600000;

    // initialise output variable
    let scheduled: Event[] = [];

    // copy the jobs array into array of jobs to be scheduled.
    let toSchedule = jobs.map((x) => {
        return {
            name: x.name,
            estimatedTime: x.estimatedTime,
            deadline: changeTimezone(x.deadline),
            slackTime:
                changeTimezone(x.deadline).getTime() -
                currentTime -
                x.estimatedTime * 3600000,
        };
    });

    // add blocked times to the array of current events
    let blockedTimes: Event[] = events;

    if (preferences.blockTimes != null) {
        blockedTimes = blockedTimes.concat(preferences.blockTimes);
    }

    // sort blocked times
    blockedTimes.sort(function (a, b) {
        return a.endDate.getTime() - b.endDate.getTime();
    });

    // run algorithm until there is nothing left to be scheduled.
    while (!(toSchedule.length === 0)) {
        // get rid of any blocked times that end after the current time
        blockedTimes = blockedTimes.filter(
            (x) => x.endDate.getTime() > currentTime,
        );

        // sort the to be scheduled array to find the job with the least slack time
        toSchedule.sort(function (a, b) {
            return a.slackTime - b.slackTime;
        });
        let currentJob = toSchedule[0];

        // initialise the start and end dates
        let plannedStartDate = currentTime;
        let plannedEndDate = currentTime + interval;

        if (blockedTimes.length === 0) {
            scheduled.push({
                name: currentJob.name,
                startDate: new Date(plannedStartDate), //TODO Not sure if this conversion works
                endDate: new Date(plannedEndDate),
            });
        } else if (
            // the job can be scheduled at the current time
            plannedStartDate < blockedTimes[0].startDate.getTime() &&
            plannedEndDate < blockedTimes[0].startDate.getTime()
        ) {
            // add job block to the output
            scheduled.push({
                name: currentJob.name,
                startDate: new Date(plannedStartDate),
                endDate: new Date(plannedEndDate),
            });
        } else {
            // loops through to see where the job can be scheduled
            let nextStartDate = scheduleBetweenEvents(interval, blockedTimes);

            // update the start time and end time to where the job can be scheduled
            plannedStartDate = nextStartDate.getTime();
            plannedEndDate = nextStartDate.getTime() + interval;

            //update the output
            scheduled.push({
                name: currentJob.name,
                startDate: new Date(plannedStartDate),
                endDate: new Date(plannedEndDate),
            });
        }

        // update the current time
        currentTime = plannedEndDate;

        // update the estimated time to complete
        toSchedule[0].estimatedTime - interval / 3600000;

        // update slack times
        toSchedule.forEach((x) => {
            x.slackTime =
                x.deadline.getTime() - currentTime - x.estimatedTime * 3600000;
        });
        //get rid of any of the jobs that are finished
        toSchedule = toSchedule.filter((x) => {
            x.estimatedTime > 0;
        });
    }

    return scheduled;
}

function scheduleBetweenEvents(interval: number, blockedTimes: Event[]) {
    // we know that we can't schedule it before the first block
    // so now we start by trying to schedule after the first block
    let startDate: number = blockedTimes[0].endDate.getTime();
    let endDate: number = startDate + interval;

    // loop through to see where the job can fit
    for (let i = 0; i < blockedTimes.length - 1; i++) {
        if (
            startDate >= blockedTimes[i].endDate.getTime() &&
            endDate <= blockedTimes[i + 1].startDate.getTime()
        ) {
            return blockedTimes[i].endDate;
        }
    }
    return blockedTimes[blockedTimes.length - 1].endDate;
}
