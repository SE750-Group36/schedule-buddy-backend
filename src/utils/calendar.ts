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
    let currentTime: number;
    if (preferences.startTime != null) {
        currentTime = preferences.startTime;
    } else {
        let now = Date.now();
        currentTime = now - (now % 3600000) + 3600000;
    }
    const interval = preferences.maxInterval
        ? preferences.maxInterval * 3600000
        : 3600000;
    let scheduled: Event[] = [];
    const toSchedule = jobs.map((x) => {
        return {
            name: x.name,
            estimatedTime: x.estimatedTime,
            deadline: x.deadline,
            slackTime: x.deadline - currentTime - x.estimatedTime * 3600000
        };
    });

    let blockedTimes: Event[] = events.concat(preferences.blockTimes);

    blockedTimes.sort(function (a, b) {
        return a.endDate - b.endDate;
    });

    while (!(toSchedule.length === 0)) {
        blockedTimes = blockedTimes.filter((x) => x.endDate > currentTime);
        // Start of the iteration
        toSchedule.sort(function (a, b) {
            return a.slackTime - b.slackTime;
        });

        let currentJob = toSchedule[0];

        let plannedStartDate = currentTime;
        let plannedEndDate = currentTime + interval;

        if (
            plannedStartDate < blockedTimes[0].startDate &&
            plannedEndDate < blockedTimes[0].startDate
        ) {
            scheduled.push({
                name: currentJob.name,
                startDate: plannedStartDate,
                endDate: plannedEndDate
            });
        } else {
            let index = scheduleBetweenEvents(plannedStartDate, plannedEndDate, blockedTimes);
            if (index == null){
                return null;
            } else {
                plannedStartDate = blockedTimes[index].startDate
                plannedEndDate = blockedTimes[index].startDate + interval

                scheduled.push({
                name: currentJob.name,
                startDate: plannedStartDate,
                endDate: plannedEndDate
            });
            }
        }

        currentTime = plannedEndDate

        toSchedule[0].estimatedTime - (interval/3600000)

        toSchedule.forEach( x=> {
            x.slackTime = x.deadline - currentTime - x.estimatedTime * 3600000
        })
        toSchedule.filter(x=> {x.estimatedTime > 0})
    }

    return scheduled;
}

function scheduleBetweenEvents(startDate: number, endDate: number, blockedTimes: Event[]
) {
    for (let i = 0; i < blockedTimes.length - 1; i++) {
        if (
            startDate > blockedTimes[i].endDate &&
            endDate < blockedTimes[i + 1].startDate
        ) {
            return i;
        }
    }

    return null;
}

interface Job {
    name: String;
    estimatedTime: number;
    deadline: number;
}
