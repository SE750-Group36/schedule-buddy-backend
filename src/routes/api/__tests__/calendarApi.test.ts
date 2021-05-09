import { generateSchedule } from "../../../schedule/utils"
import { oneEventCal } from "../../../examples/oneEventCal";
import { preferenceExample } from "../../../examples/preferenceExample";
import { oneJob } from "../../../examples/oneJob";


it("Test scheduler one event and one job", async () => {
    const jobs = [oneJob];
    const preferences = preferenceExample;
    const calendar = oneEventCal;

    const schedule = generateSchedule(calendar, jobs, preferences);

    console.log(schedule);
    
    expect(true);
});