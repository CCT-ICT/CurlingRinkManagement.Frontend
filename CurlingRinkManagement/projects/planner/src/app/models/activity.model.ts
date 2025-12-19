import { DateTimeRange } from "./date-time-range.model";
import { SheetActivity } from "./sheet-activity.model";

export class ActivityModel {
    public id: string = crypto.randomUUID();
    public clubId: string = crypto.randomUUID();
    public title: string = "";
    public sheetActivities: SheetActivity[] = [];
    public activityTypeId: string = "00000000-0000-0000-0000-000000000000";
}