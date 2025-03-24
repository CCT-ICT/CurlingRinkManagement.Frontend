export class DateTimeRange {
    public id : string = crypto.randomUUID();
    public start : Date = new Date();
    public end : Date = new Date();
    public minutesBlockedBefore : number = 0;
    public minutesBlockedAfter : number = 0;
    public activityId : string = "00000000-0000-0000-0000-000000000000";
}