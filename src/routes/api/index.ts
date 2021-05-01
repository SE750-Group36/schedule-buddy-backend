import express from "express";

const router = express.Router();

import calendar from "./calendar";
router.use("/calendar", calendar);

export default router;
