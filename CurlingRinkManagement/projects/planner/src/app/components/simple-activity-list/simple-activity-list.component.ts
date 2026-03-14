import { Component, Input, input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivityModel } from '../../models/activity.model';
import { ActivityTypeModel } from '../../models/activity-type.model';
import { CustomerRequest, CustomerRequestState } from '../../models/customer-request.model';
import { CustomerRequestService } from '../../services/customer-request.service';

@Component({
  selector: 'app-simple-activity-list',
  imports: [],
  templateUrl: './simple-activity-list.component.html',
  styleUrl: './simple-activity-list.component.scss'
})
export class SimpleActivityListComponent implements OnChanges {
  @Input()
  public activities: ActivityModel[] = [];
  @Input()
  public activityTypes: ActivityTypeModel[] = []

  public requestsForActivities: Map<string, CustomerRequest> = new Map<string, CustomerRequest>();

  constructor(private requestService: CustomerRequestService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.activities.forEach(activity => {
      if (activity.customerRequestId && !this.requestsForActivities.has(activity.customerRequestId)) {
        this.requestService.getById(activity.customerRequestId).subscribe(request => {
          this.requestsForActivities.set(request.id, request);
        });
      }
    });
  }

  getColor(activity: ActivityModel) {
    let activityType = this.activityTypes.find(a => a.id == activity.activityTypeId);
    return activityType?.color ?? "aqua";
  }

  public getEnumString(request: CustomerRequest) {
    return CustomerRequestState[request.customerRequestState]
  }
}
