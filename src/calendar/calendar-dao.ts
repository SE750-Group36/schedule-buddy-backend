import { Calendar } from "./schema";

async function createCalendar(calendar: iCalendar) {
    const dbCalendar = new Calendar(calendar);
    await dbCalendar.save();
    return dbCalendar;
}

async function retrieveCalendar(id: string, userId: string) {
    return await Calendar.findOne({ _id: id, user_id: userId });
}

async function retrieveCalendarList(userId: string) {
    return await Calendar.find({ user_id: userId });
}

async function deleteCalendar(id: string, userId: string) {
    await Calendar.deleteOne({ _id: id, user_id: userId });
}

export interface iCalendar {
    user_id: string;
    calendar: Object;
}

export {
    createCalendar,
    retrieveCalendar,
    retrieveCalendarList,
    deleteCalendar,
};
