import { Component, EventEmitter, input, Input, OnChanges, Output, output, SimpleChanges } from '@angular/core';
import { MulyiSheetActivitySelectComponent } from "../multi-date-select/multi-date-select.component";
import { RequestSelectorComponent } from "../request-selector/request-selector.component";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerRequest } from '../../models/customer-request.model';
import { ActivityModel } from '../../models/activity.model';
import { ActivityService } from '../../services/activity.service';
import { CustomerRequestService } from '../../services/customer-request.service';
import { ActivityTypeModel } from '../../models/activity-type.model';
import { DateTimeRange } from '../../models/date-time-range.model';
import { SheetTimeInput, dateTimeInputToDates } from '../../models/date-time-input.model';

@Component({
  selector: 'app-activity-editor',
  imports: [MulyiSheetActivitySelectComponent, RequestSelectorComponent, ReactiveFormsModule],
  templateUrl: './activity-editor.component.html',
  styleUrl: './activity-editor.component.scss'
})
export class ActivityEditorComponent implements OnChanges {

  @Input()
  public activity: ActivityModel = new ActivityModel();
  @Input()
  public activityTypes: ActivityTypeModel[] = []
  @Input()
  public isCreating: boolean = false;
  @Input()
  public selectedTimeRange: SheetTimeInput | null = null;
  @Output()
  public activityChanged = new EventEmitter<ActivityModel>();
  @Output()
  public onClose = new EventEmitter<void>();

  public plannedDates: SheetTimeInput[] = [];
  public selectedRequest: CustomerRequest | null = null;
  private formBuilder = new FormBuilder();
  public activityForm = this.formBuilder.nonNullable.group({
    title: new FormControl(''),
    activityTypeId: new FormControl('', Validators.required)
  });

  constructor(private activityService: ActivityService, private requestService: CustomerRequestService) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.activityForm.controls.activityTypeId.setValue(this.activity.activityTypeId);
    this.activityForm.controls.title.setValue(this.activity.title);
    if (this.activity.customerRequestId != null && this.activity.customerRequestId != "") {
      this.requestService.getById(this.activity.customerRequestId).subscribe(request => {
        this.selectedRequest = request;
      });
    }
    this.plannedDates = this.activity.sheetActivities.map((p) => new SheetTimeInput(p.activityTime.start, p.activityTime.end, p.sheetId))
    if (this.plannedDates.length == 0 && this.selectedTimeRange) {
      this.plannedDates = [this.selectedTimeRange];
    }
  }

  save() {
    if (this.activityForm.invalid) return;
    let form = this.activityForm.value;
    let activity = this.activity;
    activity.sheetActivities = [];

    this.plannedDates.forEach(d => {
      let planned = new DateTimeRange();
      let range = dateTimeInputToDates(d);
      planned.start = range[0];
      planned.end = range[1];
      activity.sheetActivities.push({ sheetId: d.sheetId, activityTime: planned, activityId: activity.id, id: crypto.randomUUID() });

    });

    activity.activityTypeId = form.activityTypeId!;
    activity.title = form.title!;
    activity.customerRequestId = this.selectedRequest?.id ?? null;
    if (this.isCreating) {
      this.activityService.create(activity).subscribe({
        next: a => {
          this.activityChanged.emit(a);
        },
        error: e => {
          console.log(e);
        }
      });
    } else {
      this.activityService.update(activity).subscribe({
        next: a => {
          this.activityChanged.emit(a);
        },
        error: e => {
          console.log(e);
        }
      });
    }
  }

  close() {
    this.onClose.emit();
  }
}
