import { Calendar } from "./schema";

async function createCalender(calender: iCalender) {
    const dbCalendar = new Calendar(calender);
    await dbCalendar.save();
    return dbCalendar;
}

async function retrieveCalenderList(userId: String) {
    return await Calendar.find({ user_id: userId });
}

async function retrieveCalendar(id: String, userId: String) {
    return await Calendar.findOne({ _id: id, user_id: userId });
}

async function deleteCalendar(id: String, userId: String) {
    await Calendar.deleteOne({ _id: id, user_id: userId });
}

export interface iCalender {
    user_id: String;
    calender: JSON;
}

export {
    createCalender,
    retrieveCalenderList,
    retrieveCalendar,
    deleteCalendar,
};
