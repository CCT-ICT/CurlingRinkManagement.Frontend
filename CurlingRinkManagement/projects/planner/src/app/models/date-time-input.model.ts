import moment from "moment"
import { User } from "../../../../common-api/src/lib/models/user.model"

export class SheetTimeInput {
    public date: string = "" //yyyy-mm-DD
    public startTime: string = "" //HH:MM
    public endTime: string = "" //HH:MM
    public sheetId: string | null= ""
    public instructorIds: string[] = []

    constructor(start: Date, end: Date, sheetId: string | null, instructorIds: string[]) {
        this.date = moment(start).format('yyyy-MM-DD');
        this.startTime = moment(start).format('HH:mm');
        this.endTime = moment(end).format('HH:mm');
        this.sheetId = sheetId;
        this.instructorIds = instructorIds;
    }
}

export function dateTimeInputToDates(dateTimeInput : SheetTimeInput) : [Date, Date]{

    let start = moment(dateTimeInput.date + " " + dateTimeInput.startTime, "yyyy-MM-DD HH:mm").toDate();
    let end = moment(dateTimeInput.date + " " + dateTimeInput.endTime, "yyyy-MM-DD HH:mm").toDate();
    return [start, end];
}