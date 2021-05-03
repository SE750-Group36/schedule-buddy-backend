import mongoose from "mongoose";

const Schema = mongoose.Schema;

const calendarSchema = new Schema({
    user_id: { type: String, required: true },
    calendar: JSON,
});

const Calendar = mongoose.model("Calendars", calendarSchema);

export { Calendar };
