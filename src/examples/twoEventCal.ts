export const twoEventCal = {
    _id: { $oid: "60972a41e9dcd63e8cd06044" },
    user_id: "608cbbadebda930016288b5c",
    calendar: [
        "vcalendar",
        [["prodid", {}, "text", "-schedule buddy generator"]],
        [
            [
                "vtimezone",
                [
                    ["tzid", {}, "text", "Pacific/Auckland"],
                    ["x-lic-location", {}, "unknown", "Pacific/Auckland"],
                ],
                [
                    [
                        "daylight",
                        [
                            ["tzoffsetfrom", {}, "utc-offset", "+12:00"],
                            ["tzoffsetto", {}, "utc-offset", "+13:00"],
                            ["tzname", {}, "text", "NZDT"],
                            ["dtstart", {}, "date-time", "1970-09-27T02:00:00"],
                            [
                                "rrule",
                                {},
                                "recur",
                                {
                                    freq: "YEARLY",
                                    bymonth: { $numberInt: "9" },
                                    byday: "-1SU",
                                },
                            ],
                        ],
                        [],
                    ],
                    [
                        "standard",
                        [
                            ["tzoffsetfrom", {}, "utc-offset", "+13:00"],
                            ["tzoffsetto", {}, "utc-offset", "+12:00"],
                            ["tzname", {}, "text", "NZST"],
                            ["dtstart", {}, "date-time", "1970-04-05T03:00:00"],
                            [
                                "rrule",
                                {},
                                "recur",
                                {
                                    freq: "YEARLY",
                                    bymonth: { $numberInt: "4" },
                                    byday: "1SU",
                                },
                            ],
                        ],
                        [],
                    ],
                ],
            ],
            [
                "vevent",
                [
                    ["summary", {}, "text", "Event 1"],
                    ["dtstart", {}, "date", "2021-05-04"],
                    ["dtend", {}, "date", "2021-05-04"],
                ],
                [],
            ],
            [
                "vevent",
                [
                    ["summary", {}, "text", "Event 2"],
                    ["dtstart", {}, "date", "2021-05-04"],
                    ["dtend", {}, "date", "2021-05-04"],
                ],
                [],
            ],
        ],
    ],
};
