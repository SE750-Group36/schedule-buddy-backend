import express from "express";

const router = express.Router();

import calendar from "./calendar";
router.use("/calendar", calendar);

import schedule from "./schedule";
router.use("/schedule", schedule);

export default router;
