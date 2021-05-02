//TODO change return type
export function formatCalendar(icsJSON: any): any[] {
    let events = icsJSON[2].slice(1).map((x: any[]) => {
        return {
            name: x[0],
            startDate: x[1][0][3],
            endDate: x[1][1][3],
            description: x[1][5][3],
        };
    });
    return events;
}
