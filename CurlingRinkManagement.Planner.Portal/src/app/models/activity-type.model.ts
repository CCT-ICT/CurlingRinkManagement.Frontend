export class ActivityTypeModel {
    public id : string = crypto.randomUUID();
    public type : string = "";
    public recommendedMinutesBlockedBefore : number = -1;
    public recommendedMinutesBlockedAfter : number = -1;
    public color: string = "#FFFFFF";
}