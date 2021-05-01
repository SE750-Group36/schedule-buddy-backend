import express from "express";
import { formatCalendar } from "../../utils/calendar";

const router = express.Router();
const fs = require("fs");

router.get("/save", (req, res) => {
    let rawdata = fs.readFileSync("calendarEx.json");
    let calendar = JSON.parse(rawdata);

    res.json({
        calName: formatCalendar(calendar),
    });
});

export default router;