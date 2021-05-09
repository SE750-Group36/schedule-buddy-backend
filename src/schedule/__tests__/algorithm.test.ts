import { generateSchedule } from "../utils";
import { oneEventCal, threeEventCal, twoEventCal } from "./calendarExamples";
import { oneJob } from "./oneJob";
import { preferenceExample } from "./preferenceExample";

it("Test scheduler one event and one job", async () => {
    const jobs = [oneJob];
    const preferences = preferenceExample;
    const calendar = oneEventCal;

    let schedule: any = generateSchedule(calendar, jobs, preferences);

    const events = schedule.jCal[2].slice(1);

    expect(String(events[0][1][1][3])).toMatch("2021-05-11T01:00:00");
    expect(String(events[0][1][2][3])).toMatch("2021-05-11T02:00:00");
});

it("Test scheduler two events and one job", async () => {
    const jobs = [oneJob];
    const preferences = preferenceExample;
    const calendar = twoEventCal;

    let schedule: any = generateSchedule(calendar, jobs, preferences);

    const events = schedule.jCal[2].slice(1);

    expect(String(events[0][1][1][3])).toMatch("2021-05-11T04:00:00");
    expect(String(events[0][1][2][3])).toMatch("2021-05-11T05:00:00");
});

it("Test scheduling job between events", async () => {
    const jobs = [oneJob];
    const preferences = preferenceExample;
    const calendar = threeEventCal;

    let schedule: any = generateSchedule(calendar, jobs, preferences);

    const events = schedule.jCal[2].slice(1);

    expect(String(events[0][1][1][3])).toMatch("2021-05-11T03:00:00");
    expect(String(events[0][1][2][3])).toMatch("2021-05-11T04:00:00");
});
