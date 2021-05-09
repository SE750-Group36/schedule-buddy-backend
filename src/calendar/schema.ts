import mongoose from "mongoose";

const Schema = mongoose.Schema;

const calendarSchema = new Schema({
    user_id: { type: String, required: true },
    calendar: { type: JSON, strict: false, required: true },
});

const Calendar = mongoose.model("Calendars", calendarSchema);
const CalendarTest = mongoose.model("testCalendars", calendarSchema);

export { Calendar, CalendarTest };
