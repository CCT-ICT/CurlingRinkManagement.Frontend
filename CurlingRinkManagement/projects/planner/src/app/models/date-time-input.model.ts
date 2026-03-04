import moment from "moment"

export class SheetTimeInput {
    public date: string = "" //yyyy-mm-DD
    public startTime: string = "" //HH:MM
    public endTime: string = "" //HH:MM
    public sheetId: string = ""

    constructor(start: Date, end: Date, sheetId: string) {
        this.date = moment(start).format('yyyy-MM-DD');
        this.startTime = moment(start).format('HH:mm');
        this.endTime = moment(end).format('HH:mm');
        this.sheetId = sheetId;
    }
}

export function dateTimeInputToDates(dateTimeInput : SheetTimeInput) : [Date, Date]{

    let start = moment(dateTimeInput.date + " " + dateTimeInput.startTime, "yyyy-MM-DD HH:mm").toDate();
    let end = moment(dateTimeInput.date + " " + dateTimeInput.endTime, "yyyy-MM-DD HH:mm").toDate();
    return [start, end];
}