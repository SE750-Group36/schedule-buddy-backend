import express from "express";
import { Calendar } from "../../calendar/schema";

const HTTP_CREATED = 201;

const router = express.Router();
const fs = require("fs");

router.post("/", async (req, res) => {
    const newCalendar = new Calendar({
        user_id: req.body.user,
        calender: req.body.calender,
    });

    await newCalendar.save();

    res.status(HTTP_CREATED)
        .header("Location", `/api/calender/${newCalendar._id}`)
        .json(newCalendar);
});

export default router;
