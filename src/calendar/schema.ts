import mongoose from "mongoose";

const Schema = mongoose.Schema;

const calendarSchema = new Schema({
    user_id: { type: String, required: true },
    calendar: { type: JSON, strict: false },
});

const Calendar = mongoose.model("CALENDARS", calendarSchema);

export { Calendar };
