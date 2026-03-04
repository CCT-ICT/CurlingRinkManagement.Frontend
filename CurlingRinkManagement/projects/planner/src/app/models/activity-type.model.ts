export class ActivityTypeModel {
    public id: string = crypto.randomUUID();
    public clubId: string = crypto.randomUUID();

    public type: string = "";
    public recommendedMinutesBlockedBefore: number = -1;
    public recommendedMinutesBlockedAfter: number = -1;
    public color: string = "#FFFFFF";
    public amountOfInstructors: number = 0;
    public instructorCalculationType: CalculationType = CalculationType.People
    public perSelectedValue: number = 0;
}

export enum CalculationType {
    People,
    Sheet,
    Activity
}