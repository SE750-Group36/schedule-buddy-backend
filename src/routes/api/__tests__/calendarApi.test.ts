import { generateSchedule } from "../../../schedule/utils"
import { oneEventCal } from "../../../examples/oneEventCal";
import { twoEventCal } from "../../../examples/twoEventCal";
import { preferenceExample } from "../../../examples/preferenceExample";
import { oneJob } from "../../../examples/oneJob";
const {Component} = require('ical.js');


it("Test scheduler one event and one job", async () => {
    const jobs = [oneJob];
    const preferences = preferenceExample;
    const calendar = oneEventCal;

    let schedule: any = generateSchedule(calendar, jobs, preferences);

    const events = schedule.jCal[2].slice(1);
    
    expect(String(events[0][1][1][3])).toMatch("2021-05-11T12:00:00");
    expect(String(events[0][1][2][3])).toMatch("2021-05-11T13:00:00");
});



it("Test scheduler two events and one job", async () => {
    const jobs = [oneJob];
    const preferences = preferenceExample;
    const calendar = twoEventCal;

    let schedule: any = generateSchedule(calendar, jobs, preferences);

    const events = schedule.jCal[2].slice(1);
    
    expect(String(events[0][1][1][3])).toMatch("2021-05-11T12:00:00");
    expect(String(events[0][1][2][3])).toMatch("2021-05-11T13:00:00");
});