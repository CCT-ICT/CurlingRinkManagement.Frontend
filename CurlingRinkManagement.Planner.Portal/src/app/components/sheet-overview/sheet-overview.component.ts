import { Component, Input, input, OnInit } from '@angular/core';
import { EventModel } from '../../models/event.model';
import { ActivityTypeModel } from '../../models/activity-type.model';
import { SheetModel } from '../../models/sheet.model';
import { ActivityService } from '../../services/activity.service';
import { ActivityModel } from '../../models/activity.model';
import { DateTimeRange } from '../../models/date-time-range.model';
import { MultiDateSelectComponent } from "../multi-date-select/multi-date-select.component";
import { DateTimeInput, dateTimeInputToDates } from '../../models/date-time-input.model';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sheet-overview',
  standalone: true,
  imports: [MultiDateSelectComponent, ReactiveFormsModule],
  templateUrl: './sheet-overview.component.html',
  styleUrl: './sheet-overview.component.scss'
})
export class SheetOverviewComponent implements OnInit {
  @Input()
  public sheet: SheetModel = new SheetModel();

  @Input()
  public activityTypes: ActivityTypeModel[] = []


  public detailInMinutes: number = 15;
  public heightInPixels = 60;
  public times: Date[] = [];
  public day: Date = new Date();
  public currentEvent: EventModel | null = null;
  public events: EventModel[] = []
  public plannedDates: DateTimeInput[] = [];

  public isCreating: boolean = false;

  private formBuilder = new FormBuilder();
  public activityForm = this.formBuilder.nonNullable.group({
    title: new FormControl(''),
    activityTypeId: new FormControl('', Validators.required)
  });

  constructor(private activityService: ActivityService) { }


  ngOnInit(): void {
    this.loadTimes();
    this.loadActivities();
  }

  private loadTimes() {
    this.times = [];
    let currentTime = 0;
    while (currentTime < 24 * 60) {
      let today = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate());
      today.setMinutes(currentTime);
      this.times.push(today);
      currentTime += this.detailInMinutes;
    }
  }

  private loadActivities() {
    let start = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate());
    let end = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate());
    end.setHours(24);
    this.activityService.getInRange(this.sheet.id, start, end).subscribe(activities => {
      activities.forEach(activity => {
        activity.plannedDates.forEach(p => {
          this.events.push({
            timeStart: p.start,
            timeEnd: p.end,
            activity: activity,
            originalStart: p.start
          });
        })
      })
    });
  }

  getColor(event : EventModel){
    let activityType = this.activityTypes.find(a => a.id == event.activity?.activityTypeId) ;
    console.log(activityType)
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
    this.plannedDates = [new DateTimeInput(planned.start, planned.end)]

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
    if (this.currentEvent.activity != null) {
      this.plannedDates = this.currentEvent.activity.plannedDates.map((p) => new DateTimeInput(p.start, p.end))
      this.activityForm.controls.activityTypeId.setValue(this.currentEvent.activity.activityTypeId);
      this.activityForm.controls.title.setValue(this.currentEvent.activity.title);
    }

    console.log(event)
  }


  cancel() {
    if (this.currentEvent == null) return;
    if (this.isCreating) {
      this.events.splice(this.events.indexOf(this.currentEvent), 1);
      this.isCreating = false;
    }
    this.currentEvent = null;
  }

  save() {
    if (this.currentEvent == null || this.currentEvent.activity == null || this.activityForm.invalid) return;
    let form = this.activityForm.value;
    let activity = this.currentEvent.activity;
    activity.plannedDates = [];
    this.plannedDates.forEach(d => {
      let planned = new DateTimeRange();
      let range = dateTimeInputToDates(d);
      planned.start = range[0];
      planned.end = range[1];
      activity.plannedDates.push(planned);
    })
    activity.activityTypeId = form.activityTypeId!;
    activity.title = form.title!;
    activity.sheetIds = [this.sheet.id];
    console.log(this.isCreating)
    if (this.isCreating) {
      this.activityService.Create(activity).subscribe({
        next: a => {
          this.currentEvent = null;
          this.isCreating = false;
        },
        error: e => {
          console.log(e);
        }
      });
    } else{
      this.activityService.Update(activity).subscribe({
        next: a => {
          this.currentEvent = null;
        },
        error: e => {
          console.log(e);
        }
      });
    }
  }

}
