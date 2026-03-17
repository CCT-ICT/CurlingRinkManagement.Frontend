export class DateTimeRange {
    public id : string = crypto.randomUUID();
    public start : Date = new Date();
    public end : Date = new Date();
    public sheetActivityId : string = "00000000-0000-0000-0000-000000000000";
}