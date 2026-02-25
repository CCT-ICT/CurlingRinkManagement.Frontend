import { DateTimeRange } from "./date-time-range.model";

export class SheetActivity {
    id: string = '';
    activityTime: DateTimeRange = new DateTimeRange();
    sheetId: string = '';
    activityId: string = '';
}

