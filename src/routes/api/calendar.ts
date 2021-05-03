import express from "express";
import {
    createCalendar,
    deleteCalendar,
    retrieveCalendar,
    retrieveCalendarList,
} from "../../calendar/calendar-dao";

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();
const fs = require("fs");

router.post("/", async (req, res) => {
    const newCalendar = await createCalendar({
        userId: req.body.user,
        calendar: req.body.calendar,
    });

    res.status(HTTP_CREATED)
        .header("Location", `/api/calendar/${newCalendar._id}`)
        .json(newCalendar);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const userId = req.body.user;

    const calendar = await retrieveCalendar(id, userId);

    if (calendar) {
        res.json(calendar);
    } else {
        res.sendStatus(HTTP_NOT_FOUND);
    }
});

router.get("/", async (req, res) => {
    const userId = req.body.user;
    res.json(await retrieveCalendarList(userId));
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const userId = req.body.user;
    await deleteCalendar(id, userId);
    res.sendStatus(HTTP_NO_CONTENT);
});

export default router;
