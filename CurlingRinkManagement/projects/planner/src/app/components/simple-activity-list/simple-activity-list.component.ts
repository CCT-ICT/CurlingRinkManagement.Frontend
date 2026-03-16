import { Component, EventEmitter, Input, input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ActivityModel } from '../../models/activity.model';
import { ActivityTypeModel } from '../../models/activity-type.model';
import { CustomerRequest, CustomerRequestState } from '../../models/customer-request.model';
import { CustomerRequestService } from '../../services/customer-request.service';
import { ActivityService } from '../../services/activity.service';
import { SheetActivity } from '../../models/sheet-activity.model';

@Component({
  selector: 'app-simple-activity-list',
  imports: [],
  templateUrl: './simple-activity-list.component.html',
  styleUrl: './simple-activity-list.component.scss'
})
export class SimpleActivityListComponent {
  @Input()
  public activities: ActivityModel[] = [];
  @Input()
  public activityTypes: ActivityTypeModel[] = []
  @Input()
  public userId: string = '';
  @Input()
  public allowAddingInstructors: boolean = false;

  @Output()
  public instructorAdded = new EventEmitter<{ activityId: string, sheetActivityId: string }>();

  constructor(private activityService: ActivityService) { }

  public addUserAsInstructor(sheet: SheetActivity) {
    this.activityService.addUserAsInstructor(sheet.activityId, sheet.id, this.userId).subscribe(s => {
      this.instructorAdded.emit({ activityId: sheet.activityId, sheetActivityId: sheet.id });
    });
  }


  public getColor(activity: ActivityModel) {
    let activityType = this.activityTypes.find(a => a.id == activity.activityTypeId);
    return activityType?.color ?? "aqua";
  }

  public getTitle(activity: ActivityModel) {
    let activityType = this.activityTypes.find(a => a.id == activity.activityTypeId);
    if(!activity.title || activity.title.trim() === '') {
      return activityType?.type ?? '';
    }
    return activity.title;
  }

  public getEnumString(request: CustomerRequest) {
    return CustomerRequestState[request.customerRequestState]
  }
}
