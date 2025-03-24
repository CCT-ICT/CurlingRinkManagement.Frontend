import moment from "moment"

export class DateTimeInput {
    public date: string = "" //yyyy-mm-DD
    public startTime: string = "" //HH:MM
    public endTime: string = "" //HH:MM

    constructor(start: Date, end: Date) {
        this.date = moment(start).format('yyyy-MM-DD');
        this.startTime = moment(start).format('HH:mm');
        this.endTime = moment(end).format('HH:mm');
    }
}

export function dateTimeInputToDates(dateTimeInput : DateTimeInput) : [Date, Date]{

    let start = moment(dateTimeInput.date + " " + dateTimeInput.startTime, "yyyy-MM-DD HH:mm").toDate();
    let end = moment(dateTimeInput.date + " " + dateTimeInput.endTime, "yyyy-MM-DD HH:mm").toDate();
    return [start, end];
}