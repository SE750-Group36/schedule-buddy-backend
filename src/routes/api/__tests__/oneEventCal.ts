import { iCalendar } from "../../../calendar/calendar-dao";
import { iJob, iPreferences } from "../../../schedule/interfaces";

export const oneEventCal: iCalendar = {
    user_id: "",
    calendar: [],
};

export const preferenceExample: iPreferences = {
    startDate: new Date("2021-05-11T00:27:00.000Z"),
    dailyStartTime: new Date("2021-05-08T21:00:48.055Z"),
    dailyEndTime: new Date("2021-05-09T05:00:48.055Z"),
    blockedTimes: [],
    maxInterval: 1,
};

export const oneJob: iJob = {
    name: "sdf",
    estimatedTime: 10,
    deadline: new Date("2021-05-09T05:00:48.055Z"),
};
