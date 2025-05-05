import { DateTimeRange } from "./date-time-range.model";

export class ActivityModel {
    public id: string = crypto.randomUUID();
    public title: string = "";
    public plannedDates: DateTimeRange[] = [];
    public sheetIds: string[] = [];
    public activityTypeId: string = "00000000-0000-0000-0000-000000000000";
}