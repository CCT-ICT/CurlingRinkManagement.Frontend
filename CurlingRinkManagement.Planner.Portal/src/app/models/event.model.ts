import { ActivityModel } from "./activity.model";

export class EventModel {
    public timeStart: Date = new Date();
    public timeEnd: Date = new Date();
    public activity: ActivityModel | null = null;
    public originalStart: Date = new Date();
}