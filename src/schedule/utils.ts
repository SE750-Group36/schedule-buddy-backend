import { iCalendar } from "../calendar/calendar-dao";
import { iEvent, iJob, iPreferences } from "./interfaces";
const ICAL = require("ical.js");

export function generateSchedule(
    calendar: iCalendar,
    jobs: iJob[],
    preferences: iPreferences,
) {
    let events: iEvent[] = extractEvents(calendar);
    events = events.concat(extractEventsFromPreferences(preferences));
    events = purgeSecondsFromEvents(events);
    const scheduledJobs = scheduleJobs(
        events,
        jobs,
        new Date(preferences.startDate),
        preferences.maxInterval,
    );

    let cal = createCalendar();
    const timezoneComponent = extractTimeZone(calendar);
    cal = addToCalendar(cal, timezoneComponent, scheduledJobs);

    return cal;
}

function scheduleJobs(
    events: iEvent[],
    jobs: iJob[],
    startDate: Date,
    maxInterval: number,
) {
    let currentTime: number = formatStartDate(startDate).getTime();

    // set the interval time
    const interval = maxInterval * 3600000;

    // initialise output variable
    let scheduled: iEvent[] = [];

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
    let blockedTimes: iEvent[] = events;

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
            plannedEndDate <= blockedTimes[0].startDate.getTime()
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
        toSchedule[0].estimatedTime -= interval / 3600000;

        // update slack times
        toSchedule.forEach((x) => {
            x.slackTime =
                x.deadline.getTime() - currentTime - x.estimatedTime * 3600000;
        });

        //get rid of any of the jobs that are finished
        toSchedule = toSchedule.filter((x) => x.estimatedTime > 0);
    }

    return scheduled;
}

function scheduleBetweenEvents(interval: number, blockedTimes: iEvent[]) {
    // loop through to see where the job can fit
    for (let i = 0; i < blockedTimes.length - 1; i++) {
        // we know that we can't schedule it before the first block
        // so now we start by trying to schedule after the first block
        let startDate: number = blockedTimes[i].endDate.getTime();
        let endDate: number = startDate + interval;
        if (
            startDate >= blockedTimes[i].endDate.getTime() &&
            endDate <= blockedTimes[i + 1].startDate.getTime()
        ) {
            return blockedTimes[i].endDate;
        }
    }
    return blockedTimes[blockedTimes.length - 1].endDate;
}

function formatStartDate(date: Date) {
    date.setSeconds(0, 0);
    date = new Date(new Date(date).toISOString().substring(0, 10));
    date.setMinutes(0);

    date = new Date(
        date.toLocaleDateString("en-US", {
            timeZone: "Pacific/Auckland",
        }),
    );

    return date;
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
    var diff = new Date(date).getTime() - invdate.getTime();

    // so 12:00 in Toronto is 17:00 UTC
    return new Date(new Date(date).getTime() - diff); // needs to substract
}

function extractEvents(icsJSON: any): iEvent[] {
    let events = icsJSON.calendar[2].slice(1).map((x: any[]) => {
        let startDateIndex = -1;
        let endDateIndex = -1;

        for (var i = 0; i < x[1].length; i++) {
            if (x[1][i][0] == "dtstart") {
                startDateIndex = i;
            } else if (x[1][i][0] == "dtend") {
                endDateIndex = i;
            }
        }

        let event: iEvent = {
            name: x[0],
            startDate: changeTimezone(new Date(x[1][startDateIndex][3])),
            endDate: changeTimezone(new Date(x[1][endDateIndex][3])),
        };

        return event;
    });
    return events;
}

function extractEventsFromPreferences(preferences: iPreferences) {
    let blocked: iEvent[] = [];
    const breakTimes = preferences.blockedTimes;

    let dailyStartTime: Date = new Date(preferences.dailyStartTime);
    let dailyEndTime: Date = new Date(preferences.dailyEndTime);

    // if startdate is before the daily start time then block it
    if (new Date(preferences.startDate).getTime() < dailyStartTime.getTime()) {
        blocked.push({
            name: "block",
            startDate: preferences.startDate,
            endDate: dailyStartTime,
        });
    }

    // add a day to the daily start time so that we can create a block between
    // daily end and the daily start of the next day
    dailyStartTime = addDays(dailyStartTime, 1);

    for (let i = 0; i < 100; i++) {
        // append block times for breaks
        if (breakTimes != null) {
            breakTimes.forEach((b) => {
                if (b.repeats == 0 && i == 0) {
                    blocked.push({
                        name: "break",
                        startDate: new Date(b.breakStart),
                        endDate: new Date(b.breakEnd),
                    });
                } else if (b.repeats == 1) {
                    blocked.push({
                        name: "break",
                        startDate: addDays(new Date(b.breakStart), i),
                        endDate: addDays(new Date(b.breakEnd), i),
                    });
                } else if (b.repeats == 2) {
                    blocked.push({
                        name: "break",
                        startDate: addDays(new Date(b.breakStart), 7 * i),
                        endDate: addDays(new Date(b.breakEnd), 7 * i),
                    });
                }
            });
        }

        // append block times for daily start and daily end
        blocked.push({
            name: "block",
            startDate: addDays(new Date(dailyEndTime), i),
            endDate: addDays(new Date(dailyStartTime), i),
        });
    }

    return blocked;
}

function purgeSecondsFromEvents(events: iEvent[]) {
    events.forEach((x) => {
        x.endDate.setSeconds(0, 0);
    });
    return events;
}

function addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function createCalendar() {
    const ICAL = require("ical.js");
    var comp = new ICAL.Component(["vcalendar", [], []]);
    comp.updatePropertyWithValue("prodid", "-//schedule buddy generator");

    return comp;
}

function extractTimeZone(calendar: iCalendar) {
    const component = new ICAL.Component(calendar.calendar);
    return component.getFirstSubcomponent("vtimezone");
}

function addToCalendar(calender: any, timezone: any, schedule: iEvent[]) {
    calender.addSubcomponent(timezone);
    var tzid = timezone.getFirstProperty("tzid");

    schedule.forEach((e) => {
        const vevent = new ICAL.Component("vevent");
        const event = new ICAL.Event(vevent);

        event.summary = e.name;
        event.startDate = ICAL.Time.fromJSDate(e.startDate);
        event.endDate = ICAL.Time.fromJSDate(e.endDate);

        calender.addSubcomponent(vevent);
    });

    return calender;
}
