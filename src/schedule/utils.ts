//TODO change return type
export function formatCalendar(icsJSON: any): any[] {
    let events = icsJSON[2].slice(1).map((x: any[]) => {
        let startDateIndex = -1;
        let endDateIndex = -1;

        for (var i = 0; i < x[1].length; i++) {
            if (x[1][i][0] == "dtstart") {
                startDateIndex = i;
            } else if (x[1][i][0] == "dtend") {
                endDateIndex = i;
            }
        }

        return {
            name: x[0],
            startDate: x[1][startDateIndex][3],
            endDate: x[1][endDateIndex][3],
        };
    });
    return events;
}
