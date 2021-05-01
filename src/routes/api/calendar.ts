import express from "express";

const router = express.Router();

router.get("/save", (req, res) => {
    res.json({
        status: "Calendar Saved!",
    });
});

export default router;