import express from "express";
import {
    createCalender,
    retrieveCalendar,
    retrieveCalenderList,
} from "../../calendar/calender-dao";

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;

const router = express.Router();
const fs = require("fs");

router.post("/", async (req, res) => {
    const newCalendar = await createCalender({
        userId: req.body.user,
        calender: req.body.calender,
    });

    res.status(HTTP_CREATED)
        .header("Location", `/api/calender/${newCalendar._id}`)
        .json(newCalendar);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const userId = req.body.user;

    const calender = await retrieveCalendar(id, userId);

    if (calender) {
        res.json(calender);
    } else {
        res.sendStatus(HTTP_NOT_FOUND);
    }
});

router.get("/", async (req, res) => {
    const userId = req.body.user;
    res.json(await retrieveCalenderList(userId));
});

export default router;
