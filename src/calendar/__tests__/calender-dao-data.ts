export const cal1 = {
    user_id: "testUser",
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
                        ],
                        [],
                    ],
                ],
            ],
            [
                "vevent",
                [
                    ["summary", {}, "text", "Job 1"],
                    ["dtstart", {}, "date", "2021-05-04"],
                    ["dtend", {}, "date", "2021-05-04"],
                ],
                [],
            ],
        ],
    ],
};

export const cal2 = {
    user_id: "testUser",
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
                        ],
                        [],
                    ],
                ],
            ],
            [
                "vevent",
                [
                    ["summary", {}, "text", "job 2"],
                    ["dtstart", {}, "date", "2021-06-04"],
                    ["dtend", {}, "date", "2021-06-04"],
                ],
                [],
            ],
        ],
    ],
};

export const cal3 = {
    user_id: "testUser",
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
                        ],
                        [],
                    ],
                ],
            ],
            [
                "vevent",
                [
                    ["summary", {}, "text", "job 3"],
                    ["dtstart", {}, "date", "2021-07-04"],
                    ["dtend", {}, "date", "2021-07-04"],
                ],
                [],
            ],
        ],
    ],
};
