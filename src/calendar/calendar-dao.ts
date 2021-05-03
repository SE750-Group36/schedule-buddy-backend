import { Calendar } from "./schema";

async function createCalendar(calendar: iCalendar) {
    const dbCalendar = new Calendar(calendar);
    await dbCalendar.save();
    return dbCalendar;
}

async function retrieveCalendar(id: String, userId: String) {
    return await Calendar.findOne({ _id: id, user_id: userId });
}

async function retrieveCalendarList(userId: String) {
    return await Calendar.find({ user_id: userId });
}

async function deleteCalendar(id: String, userId: String) {
    await Calendar.deleteOne({ _id: id, user_id: userId });
}

export interface iCalendar {
    userId: String;
    calendar: JSON;
}

export {
    createCalendar,
    retrieveCalendar,
    retrieveCalendarList,
    deleteCalendar,
};
