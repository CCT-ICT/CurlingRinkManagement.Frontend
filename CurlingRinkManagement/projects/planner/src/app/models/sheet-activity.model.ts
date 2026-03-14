import { SheetTimeInput, dateTimeInputToDates } from "./date-time-input.model";
import { DateTimeRange } from "./date-time-range.model";
import { LinkedInstructor } from "./linked-instructor.model";

export class SheetActivity {
    id: string = '';
    activityTime: DateTimeRange = new DateTimeRange();
    sheetId: string = '';
    activityId: string = '';
    linkedInstructors: LinkedInstructor[] = [];
    amountOfInstructors: number = 0;   
    constructor(dateInput: SheetTimeInput, sheetId: string) {
        this.activityTime= new DateTimeRange();
        let range = dateTimeInputToDates(dateInput);
        this.activityTime.start = range[0];
        this.activityTime.end = range[1];
        this.sheetId = sheetId;
    }
}

