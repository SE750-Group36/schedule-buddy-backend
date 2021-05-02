export interface Event {     
    name: String;
    startDate: Number;
    endDate: Number;
} 

export interface Preferences {
    maxInterval?: number;
    blockTimes: Event[];
}

export function formatCalendar(icsJSON: any): Event[] {
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

        let event: Event = {
            name: x[0],
            startDate: new Date(x[1][startDateIndex][3]).getTime(),
            endDate: new Date(x[1][endDateIndex][3]).getTime(),
        };

        return event;
    });
    return events;
}