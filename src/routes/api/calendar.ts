import express from "express";
import {
    formatCalendar,
    Job,
    Preferences,
    scheduleJobs,
} from "../../utils/calendar";

const router = express.Router();
const fs = require("fs");
const ICAL = require("ical.js");

router.get("/save", (req, res) => {
    let rawdata = fs.readFileSync("calendarMultipleEvent.json");
    let calendar = JSON.parse(rawdata);

    let jobs: Job[] = [
        {
            name: "Job 1",
            estimatedTime: 1,
            deadline: new Date(2021, 4, 10, 12, 0, 0),
        }, //Testing
    ];

    let preferences: Preferences = {
        startTime: new Date(2021, 4, 6, 12, 0, 0), //Start time in nzst
    };

    res.json({
        Calendar: scheduleJobs(formatCalendar(calendar), jobs, preferences),
    });
});

export default router;
