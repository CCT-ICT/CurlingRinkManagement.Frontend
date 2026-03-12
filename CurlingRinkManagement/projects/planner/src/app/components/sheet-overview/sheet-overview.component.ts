import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EventModel } from '../../models/event.model';
import { ActivityTypeModel } from '../../models/activity-type.model';
import { SheetModel } from '../../models/sheet.model';
import { ActivityService } from '../../services/activity.service';
import { ActivityModel } from '../../models/activity.model';
import { DateTimeRange } from '../../models/date-time-range.model';
import { SheetTimeInput } from '../../models/date-time-input.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerRequest, CustomerRequestState } from '../../models/customer-request.model';
import { CustomerRequestService } from '../../services/customer-request.service';
import { ActivityEditorComponent } from "../activity-editor/activity-editor.component";

@Component({
  selector: 'app-sheet-overview',
  standalone: true,
  imports: [ReactiveFormsModule, ActivityEditorComponent],
  templateUrl: './sheet-overview.component.html',
  styleUrl: './sheet-overview.component.scss'
})
export class SheetOverviewComponent implements OnInit, OnChanges {
  @Input()
  public sheet: SheetModel = new SheetModel();

  @Input()
  public activityTypes: ActivityTypeModel[] = []
  @Input()
  public dayString: string = "";

  public day: Date = new Date();

  public detailInMinutes: number = 15;
  public heightInPixels = 60;
  public times: Date[] = [];
  public currentEvent: EventModel | null = null;
  public events: EventModel[] = []

  public isCreating: boolean = false;
  public selectedTimeRange: SheetTimeInput | null = null;

  public requestsForActivities: Map<string, CustomerRequest> = new Map<string, CustomerRequest>();

  constructor(private activityService: ActivityService, private requestService: CustomerRequestService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.times = [];
    this.events = [];
    this.isCreating = false;
    this.loadTimes();
    this.loadActivities();
  }


  ngOnInit(): void {
    this.loadTimes();
    this.loadActivities();
  }

  private loadTimes() {
    this.day = new Date(this.dayString);
    this.times = []
    let currentTime = 0;
    while (currentTime < 24 * 60) {
      let currentDate = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate());
      currentDate.setMinutes(currentTime);
      this.times.push(currentDate);
      currentTime += this.detailInMinutes;
    }
  }

  private loadActivities() {
    let start = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate());
    let end = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate());
    end.setHours(24);
    this.activityService.getInRange(this.sheet.id, start, end).subscribe(activities => {
      activities.forEach(activity => {
        activity.sheetActivities.forEach(p => {
          this.events.push({
            timeStart: p.activityTime.start,
            timeEnd: p.activityTime.end,
            activity: activity,
            originalStart: p.activityTime.start
          });
        })
        if (activity.customerRequestId) {
          this.requestService.getById(activity.customerRequestId).subscribe(request => {
            this.requestsForActivities.set(request.id, request);
          });
        }
      })
    });
  }

  getColor(event: EventModel) {
    let activityType = this.activityTypes.find(a => a.id == event.activity?.activityTypeId);
    return activityType?.color ?? "aqua";
  }

  getEvent(time: Date) {
    return this.events.find(e => e.timeStart.getHours() >= time.getHours() && e.timeStart.getHours() < time.getHours() + 1 && e.timeStart.getMinutes() >= time.getMinutes() && e.timeStart.getMinutes() < time.getMinutes() + 15)
  }

  getLength(event: any) {
    if (event.timeEnd == null) return 15;
    return (event.timeEnd.getHours() - event.timeStart.getHours()) * 60 + (event.timeEnd.getMinutes() - event.timeStart.getMinutes())
  }

  startClick(time: Date) {
    if (this.isCreating) return;
    this.isCreating = true;
    this.currentEvent = {
      timeStart: time,
      originalStart: time,
      timeEnd: this.addMinutes(time, 15),
      activity: null
    }
    this.events.push(this.currentEvent);
  }

  hover(time: Date) {
    if (this.currentEvent == null || this.currentEvent.activity !== null) return;
    this.changeEndTime(time);
  }

  endClick(time: Date) {
    if (this.currentEvent == null || this.currentEvent.activity !== null) return;
    this.changeEndTime(time);
    this.currentEvent.activity = new ActivityModel();
    let planned = new DateTimeRange();
    planned.start = this.currentEvent.timeStart;
    planned.end = this.currentEvent.timeEnd;
    this.selectedTimeRange = new SheetTimeInput(planned.start, planned.end, this.sheet.id, []);

    document.getElementById(this.sheet.name);
  }

  changeEndTime(time: Date) {
    if (this.currentEvent == null) return;

    if (time < this.currentEvent.originalStart) {
      this.currentEvent.timeEnd = this.currentEvent.originalStart
      this.currentEvent.timeStart = time;
    }
    else if (time === this.currentEvent.originalStart) {
      this.currentEvent.timeStart = this.currentEvent.originalStart;
      this.currentEvent.timeEnd = this.addMinutes(this.currentEvent.originalStart, 15);
    }
    else {
      this.currentEvent.timeStart = this.currentEvent.originalStart;
      this.currentEvent.timeEnd = time;
    }
  }

  addMinutes(date: Date, minutes: number) {
    let end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes())
    end.setMinutes(date.getMinutes() + minutes);
    return end;
  }

  selectEvent(event: EventModel) {
    if (this.isCreating) return;
    this.currentEvent = event

    console.log(event)
  }

  public onActivityUpdated(activity: ActivityModel) {
    if (activity.customerRequestId && !this.requestsForActivities.has(activity.customerRequestId)) {
      this.requestService.getById(activity.customerRequestId).subscribe(request => {
        this.requestsForActivities.set(request.id, request);
      });
    }
    var foundTime = false;
    activity.sheetActivities.forEach(p => {
      if (this.currentEvent && p.sheetId == this.sheet.id&& this.currentEvent.timeStart == p.activityTime.start && this.currentEvent.timeEnd == p.activityTime.end) {
        foundTime = true;
      }
    });
    if (!foundTime) {
      location.reload();
    }

    this.currentEvent = null;
    this.isCreating = false;

  }

  public onClose() {
    if (this.currentEvent == null) return;
    if (this.isCreating) {
      this.events.splice(this.events.indexOf(this.currentEvent), 1);
      this.isCreating = false;
    }
    this.currentEvent = null;
  }

  public getEnumString(request: CustomerRequest) {
    return CustomerRequestState[request.customerRequestState]
  }

}
