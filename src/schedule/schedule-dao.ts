import { Schedule } from "./schema";

async function createSchedule(schedule: iSchedule) {
    const dbSchedule = new Schedule(schedule);
    await dbSchedule.save();
    return dbSchedule;
}

async function retrieveSchedule(id: string, userId: string) {
    return await Schedule.findOne({ _id: id, user_id: userId });
}

async function retrieveScheduleList(userId: string) {
    return await Schedule.find({ user_id: userId });
}

async function deleteSchedule(id: string, userId: string) {
    await Schedule.deleteOne({ _id: id, user_id: userId });
}

interface iSchedule {
    user_id: string;
    schedule: Object;
}

export {
    createSchedule,
    retrieveSchedule,
    retrieveScheduleList,
    deleteSchedule,
};
