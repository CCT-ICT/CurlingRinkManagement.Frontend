import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { ActivityTypeService } from '../../services/activity-type.service';
import { ActivityTypeModel } from '../../models/activity-type.model';
import { ActivityModel } from '../../models/activity.model';
import { OAuthService } from 'angular-oauth2-oidc';
import { SimpleActivityListComponent } from "../simple-activity-list/simple-activity-list.component";
import { UserService } from '../../../../../common-api/src/public-api';
import { LinkedInstructor } from '../../models/linked-instructor.model';

@Component({
  selector: 'app-user-home',
  imports: [SimpleActivityListComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss'
})
export class UserHomeComponent implements OnInit {
  public activityTypes: ActivityTypeModel[] = [];
  public myActivities: ActivityModel[] = [];
  public activitiesMissingInstructor: ActivityModel[] = [];
  public myUserId: string = '';

  constructor(private activityService: ActivityService, private activityTypeService: ActivityTypeService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserId().subscribe(userId => {
      console.log("User id: " + userId);
      if (!userId) return;
      this.myUserId = userId;
      this.loadMyActivities();
      this.loadActivitiesMissingInstructor(); 
    });


    this.activityTypeService.getAll().subscribe(activityTypes => {
      this.activityTypes = activityTypes;
    });

  }

  private loadMyActivities() {
    this.activityService.getForUser(this.myUserId, new Date()).subscribe(activities => {
      this.myActivities = this.filterUserAsInstructor(activities);
    });
  }

  private loadActivitiesMissingInstructor() {
    this.activityService.getWithMissingInstructors(new Date()).subscribe(activities => {
      this.activitiesMissingInstructor = this.filterMissingInstructors(activities);
    });

  }

  private filterDates(activities: ActivityModel[]): ActivityModel[] {
    activities.forEach(activity => {
      activity.sheetActivities = activity.sheetActivities.filter(a => a.activityTime.end > new Date())
    });
    return activities.sort((a, b) => {
      let dates1 = a.sheetActivities.sort((a, b) => a.activityTime.start.getTime() - b.activityTime.start.getTime());
      let dates2 = b.sheetActivities.sort((a, b) => a.activityTime.start.getTime() - b.activityTime.start.getTime());

      let aDate = dates1.length > 0 ? dates1[0].activityTime.start : new Date();
      let bDate = dates2.length > 0 ? dates2[0].activityTime.start : new Date();
      return aDate.getTime() - bDate.getTime();
    });
  }

  private filterUserAsInstructor(activities: ActivityModel[]): ActivityModel[] {
    activities.forEach(activity => {
      activity.sheetActivities = activity.sheetActivities.filter(a => a.linkedInstructors.find(l => l.userIdentity === this.myUserId));
    });
    let filtered = this.filterDates(activities);
    return filtered;
  }


  private filterMissingInstructors(activities: ActivityModel[]): ActivityModel[] {
    activities.forEach(activity => {
      activity.sheetActivities = activity.sheetActivities.filter(a => a.linkedInstructors.length < a.amountOfInstructors && !a.linkedInstructors.some(l => l.userIdentity === this.myUserId));
    });
    
    let filtered = this.filterDates(activities);
    filtered = filtered.filter(a => a.sheetActivities.length > 0);
    return filtered;
  }

  public onInstructorAdded(event: { activityId: string, sheetActivityId: string }) {
    this.loadMyActivities();
    let sheet = this.activitiesMissingInstructor.find(a => a.id === event.activityId)?.sheetActivities.find(s => s.id === event.sheetActivityId);
    sheet?.linkedInstructors.push(new LinkedInstructor(this.myUserId));
    this.activitiesMissingInstructor = this.filterMissingInstructors(this.activitiesMissingInstructor)

  }

}
