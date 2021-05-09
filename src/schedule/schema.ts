import mongoose from "mongoose";

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    user_id: { type: String, required: true },
    schedule: { type: JSON, strict: false, required: true },
});

const Schedule = mongoose.model("Shedules", scheduleSchema);
const ScheduleTest = mongoose.model("testSchedules", scheduleSchema);

export { Schedule, ScheduleTest };
