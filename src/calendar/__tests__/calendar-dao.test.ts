import mongoose from "mongoose";
require("dotenv").config();
import { CalendarTest } from "../schema";
import { cal1, cal2, cal3 } from "./calender-dao-data";

let calendar1: any, calendar2: any;

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
    const coll = await mongoose.connection.db.createCollection("testcalendars");

    calendar1 = {
        user_id: cal1.user_id,
        calendar: cal1.calendar,
    };

    calendar2 = {
        user_id: cal2.user_id,
        calendar: cal2.calendar,
    };

    await coll.insertMany([calendar1, calendar2]);
});

/**
 * After each test, clear the database entirely
 */
afterEach(async () => {
    await mongoose.connection.db.dropCollection("testcalendars");
});

/**
 * After all tests, gracefully terminate the in-memory MongoDB instance and mongoose connection.
 */
afterAll(async () => {
    await mongoose.disconnect();
});

it("gets calendars", async () => {
    const calendars = await CalendarTest.find({});
    expect(calendars).toBeTruthy();
    expect(calendars.length).toBe(2);

    expect(calendars[0].user_id).toBe("testUser");
    expect(calendars[0].calendar).toStrictEqual(calendar1.calendar);

    expect(calendars[1].user_id).toBe("testUser");
    expect(calendars[1].calendar).toStrictEqual(calendar2.calendar);
});

it("gets a single calendar", async () => {
    console.log(JSON.stringify(calendar1));
    const calendar = await CalendarTest.findById(calendar1._id);

    expect(calendar.user_id).toBe("testUser");
    expect(calendar.calendar).toStrictEqual(cal1.calendar);
});

it("adds a calendar without crashing", async () => {
    const calendar = new CalendarTest({
        user_id: cal3.user_id,
        calendar: cal3.calendar,
    });

    await calendar.save();

    const fromDb = await mongoose.connection.db
        .collection("testcalendars")
        .findOne({ _id: calendar._id });
    expect(fromDb).toBeTruthy();
    expect(fromDb.user_id).toBe("testUser");
    expect(fromDb.calendar).toStrictEqual(cal3.calendar);
});

it("deletes a calendar", async () => {
    await mongoose.connection.db
        .collection("testcalendars")
        .deleteOne({ _id: calendar1._id });

    const fromDB = await mongoose.connection.db
        .collection("testcalendars")
        .findOne({ _id: calendar1._id });

    expect(fromDB).toBe(null);
});

it("fails when no user id is provided", () => {
    const calendar = new CalendarTest({
        calendar: cal3.calendar,
    });

    return expect(calendar.save()).rejects.toThrow();
});

it("fails when no calendar is added", () => {
    const calendar = new CalendarTest({
        user_id: "testUser",
    });

    return expect(calendar.save()).rejects.toThrow();
});
