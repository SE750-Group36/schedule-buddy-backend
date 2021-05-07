import express from "express";
import {
    createSchedule,
    deleteSchedule,
    retrieveSchedule,
    retrieveScheduleList,
} from "../../schedule/schedule-dao";

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();
const fs = require("fs");

router.post("/", async (req, res) => {
    const newSchedule = await createSchedule({
        user_id: req.body.user,
        schedule: req.body.schedule,
    });

    res.status(HTTP_CREATED)
        .header("Location", `/api/schedule/${newSchedule._id}`)
        .json(newSchedule);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const userId = req.query.user?.toString();

    if (userId == null) {
        res.sendStatus(HTTP_NOT_FOUND);
    } else {
        const schedule = await retrieveSchedule(id, userId);

        if (schedule) {
            res.json(schedule);
        } else {
            res.sendStatus(HTTP_NOT_FOUND);
        }
    }
});

router.get("/", async (req, res) => {
    const userId = req.query.user?.toString();
    if (userId == null) {
        res.sendStatus(HTTP_NOT_FOUND);
    } else {
        res.json(await retrieveScheduleList(userId));
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const userId = req.query.user?.toString();
    if (userId == null) {
        res.sendStatus(HTTP_NOT_FOUND);
    } else {
        await deleteSchedule(id, userId);
        res.sendStatus(HTTP_NO_CONTENT);
    }
});

export default router;
