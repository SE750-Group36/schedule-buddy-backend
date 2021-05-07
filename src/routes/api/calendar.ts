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

router.post("/", async (req, res) => {
    const newCalendar = await createCalendar({
        user_id: req.body.user,
        calendar: req.body.calendar,
    });

    res.status(HTTP_CREATED)
        .header("Location", `/api/calendar/${newCalendar._id}`)
        .json(newCalendar);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const userId = req.query.user?.toString();

    if (userId == null) {
        res.sendStatus(HTTP_NOT_FOUND);
    } else {
        const calendar = await retrieveCalendar(id, userId);

        if (calendar) {
            res.json(calendar);
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
        res.json(await retrieveCalendarList(userId));
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const userId = req.query.user?.toString();
    if (userId == null) {
        res.sendStatus(HTTP_NOT_FOUND);
    } else {
        await deleteCalendar(id, userId);
        res.sendStatus(HTTP_NO_CONTENT);
    }
});

export default router;
