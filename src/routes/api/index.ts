import express from "express";

const router = express.Router();

import hello from "./hello";
router.use("/hello", hello);

export default router;
