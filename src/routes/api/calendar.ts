import express from "express";
import { formatCalendar, Job, Preferences, scheduleJobs } from "../../utils/calendar";

const router = express.Router();
const fs = require("fs");

router.get("/save", (req, res) => {
  let rawdata = fs.readFileSync("calendarOneEvent.json");
  let calendar = JSON.parse(rawdata);

  let jobs: Job[] = [
    { name: "Job 1", estimatedTime: 2, deadline: new Date(2021, 5, 5, 20, 0, 0) }//Testing
  ];

  let preferences: Preferences = {} 

  res.json({
    Calendar: scheduleJobs(formatCalendar(calendar), jobs, preferences),
  });
});

export default router;