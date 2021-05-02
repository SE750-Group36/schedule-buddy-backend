export interface Event {
    name: String;
    startDate: number;
    endDate: number;
}

export interface Preferences {
    startTime: number;
    maxInterval?: number;
    blockTimes: Event[];
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
            startDate: new Date(x[1][startDateIndex][3]).getTime(),
            endDate: new Date(x[1][endDateIndex][3]).getTime()
        };

        return event;
    });
    return events;
}

export function scheduleJobs( events: Event[], jobs: Job[], preferences: Preferences) {
    // configure current time
    let currentTime: number;
    if (preferences.startTime != null) {
        currentTime = preferences.startTime;
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
    const toSchedule = jobs.map((x) => {
        return {
            name: x.name,
            estimatedTime: x.estimatedTime,
            deadline: x.deadline,
            slackTime: x.deadline - currentTime - x.estimatedTime * 3600000
        };
    });

    // add blocked times to the array of current events
    let blockedTimes: Event[] = events.concat(preferences.blockTimes);

    // sort blocked times
    blockedTimes.sort(function (a, b) {
        return a.endDate - b.endDate;
    });

    // run algorithm until there is nothing left to be scheduled.
    while (!(toSchedule.length === 0)) {
        // get rid of any blocked times that end after the current time
        blockedTimes = blockedTimes.filter((x) => x.endDate > currentTime);

        // sort the to be scheduled array to find the job with the least slack time
        toSchedule.sort(function (a, b) {
            return a.slackTime - b.slackTime;
        });
        let currentJob = toSchedule[0];

        // initialise the start and end dates 
        let plannedStartDate = currentTime;
        let plannedEndDate = currentTime + interval;

        if ( // the job can be scheduled at the current time
            plannedStartDate < blockedTimes[0].startDate &&
            plannedEndDate < blockedTimes[0].startDate
        ) {
            // add job block to the output
            scheduled.push({
                name: currentJob.name,
                startDate: plannedStartDate,
                endDate: plannedEndDate
            });
        } else {
            // loops through to see where the job can be scheduled
            let nextStartDate = scheduleBetweenEvents(plannedStartDate, plannedEndDate, blockedTimes);
        
                // update the start time and end time to where the job can be scheduled
                plannedStartDate = nextStartDate
                plannedEndDate = nextStartDate + interval

                //update the output
                scheduled.push({
                name: currentJob.name,
                startDate: plannedStartDate,
                endDate: plannedEndDate
                 });
        }

        // update the current time
        currentTime = plannedEndDate

        // update the estimated time to complete
        toSchedule[0].estimatedTime - (interval/3600000)

        // update slack times
        toSchedule.forEach( x=> {
            x.slackTime = x.deadline - currentTime - x.estimatedTime * 3600000
        })
        //get rid of any of the jobs that are finished
        toSchedule.filter(x=> {x.estimatedTime > 0})
    }

    return scheduled;
}

function scheduleBetweenEvents(startDate: number, endDate: number, blockedTimes: Event[]) {
    // loop through to see where the job can fit
    for (let i = 0; i < blockedTimes.length - 1; i++) {
        if (
            startDate > blockedTimes[i].endDate &&
            endDate < blockedTimes[i + 1].startDate
        ) {
            return blockedTimes[i].endDate;
        }
    }
    return blockedTimes[blockedTimes.length - 1].endDate
}

interface Job {
    name: String;
    estimatedTime: number;
    deadline: number;
}
