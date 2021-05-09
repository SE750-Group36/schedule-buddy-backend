import mongoose from "mongoose";
require("dotenv").config();
import { ScheduleTest } from "../schema";
import { sched1, sched2, sched3 } from "./schedule-dao-data";

let schedule1: any, schedule2: any;

/**
 * Before all tests, create an in-memory MongoDB instance so we don't have to test on a real database,
 * then establish a mongoose connection to it.
 */
beforeAll(async () => {
    const connectionString = process.env.MONGO_URI;
    if (connectionString != null) {
        await mongoose.connect(connectionString, { useNewUrlParser: true });
    }
});

/**
 * Before each test, intialize the database with some data
 */
beforeEach(async () => {
    const coll = await mongoose.connection.db.createCollection("testschedules");

    schedule1 = {
        user_id: sched1.user_id,
        schedule: sched1.schedule,
    };

    schedule2 = {
        user_id: sched2.user_id,
        schedule: sched2.schedule,
    };

    await coll.insertMany([schedule1, schedule2]);
});

/**
 * After each test, clear the database entirely
 */
afterEach(async () => {
    await mongoose.connection.db.dropCollection("testschedules");
});

/**
 * After all tests, gracefully terminate the in-memory MongoDB instance and mongoose connection.
 */
afterAll(async () => {
    await mongoose.disconnect();
});

it("gets schedules", async () => {
    const schedules = await ScheduleTest.find({});
    expect(schedules).toBeTruthy();
    expect(schedules.length).toBe(2);

    expect(schedules[0].user_id).toBe("testUser");
    expect(schedules[0].schedule).toStrictEqual(schedule1.schedule);

    expect(schedules[1].user_id).toBe("testUser");
    expect(schedules[1].schedule).toStrictEqual(schedule2.schedule);
});

it("gets a single schedule", async () => {
    console.log(JSON.stringify(schedule1));
    const schedule = await ScheduleTest.findById(schedule1._id);

    expect(schedule.user_id).toBe("testUser");
    expect(schedule.schedule).toStrictEqual(sched1.schedule);
});

it("adds a schedule without crashing", async () => {
    const schedule = new ScheduleTest({
        user_id: sched3.user_id,
        schedule: sched3.schedule,
    });

    await schedule.save();

    const fromDb = await mongoose.connection.db
        .collection("testschedules")
        .findOne({ _id: schedule._id });
    expect(fromDb).toBeTruthy();
    expect(fromDb.user_id).toBe("testUser");
    expect(fromDb.schedule).toStrictEqual(sched3.schedule);
});

it("deletes a schedule", async () => {
    await mongoose.connection.db
        .collection("testschedules")
        .deleteOne({ _id: schedule1._id });

    const fromDB = await mongoose.connection.db
        .collection("testschedules")
        .findOne({ _id: schedule1._id });

    expect(fromDB).toBe(null);
});

it("fails when no user id is provided", () => {
    const schedule = new ScheduleTest({
        schedule: sched3.schedule,
    });

    return expect(schedule.save()).rejects.toThrow();
});

it("fails when no schedule is added", () => {
    const schedule = new ScheduleTest({
        user_id: "testUser",
    });

    return expect(schedule.save()).rejects.toThrow();
});
