import mongoose from "mongoose";

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    user_id: { type: String, required: true },
    schedule: { type: JSON, strict: false },
});

const Schedule = mongoose.model("SCHEDULES", scheduleSchema);

export { Schedule };
