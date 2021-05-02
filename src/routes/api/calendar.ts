import express from "express";
import { formatCalendar, Job, Preferences, scheduleJobs } from "../../utils/calendar";

const router = express.Router();
const fs = require("fs");

router.get("/save", (req, res) => {
  let rawdata = fs.readFileSync("calendarEx.json");
  let calendar = JSON.parse(rawdata);

  let jobs: Job[] = [
    { name: "Job 1", estimatedTime: 2, deadline: 1620644400000 }
  ];

  let preferences: Preferences = {} 

  res.json({
    Calendar: scheduleJobs(formatCalendar(calendar), jobs, preferences),
  });
});

export default router;