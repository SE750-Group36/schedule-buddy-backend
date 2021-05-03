import mongoose from "mongoose";

const Schema = mongoose.Schema;

const calendarSchema = new Schema({
    user_id: { type: String, required: true },
    calender: JSON,
});

const Calendar = mongoose.model("Calenders", calendarSchema);

export { Calendar };
