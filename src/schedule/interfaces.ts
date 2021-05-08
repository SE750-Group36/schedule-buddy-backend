interface iEvent {
    name: String;
    startDate: Date;
    endDate: Date;
}

interface iPreferences {
    startDate: Date;
    dailyStartTime: Date;
    dailyEndTime: Date;
    maxInterval: number;
    blockedTimes?: iBlockedtimes[];
}

interface iBlockedtimes {
    breakDate: Date;
    repeats: number;
    breakStart: Date;
    breakEnd: Date;
}

interface iJob {
    name: String;
    estimatedTime: number;
    deadline: Date;
}

export { iEvent, iPreferences, iJob };
