import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { ActivityTypeService } from '../../services/activity-type.service';
import { ActivityTypeModel } from '../../models/activity-type.model';
import { ActivityModel } from '../../models/activity.model';
import { OAuthService } from 'angular-oauth2-oidc';
import { SimpleActivityListComponent } from "../simple-activity-list/simple-activity-list.component";
import { UserService } from '../../../../../common-api/src/public-api';

@Component({
  selector: 'app-user-home',
  imports: [SimpleActivityListComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss'
})
export class UserHomeComponent implements OnInit {
  public activityTypes: ActivityTypeModel[] = [];
  public myActivities: ActivityModel[] = [];

  constructor(private activityService: ActivityService, private activityTypeService: ActivityTypeService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserId().subscribe(userId => {
      console.log("User id: " + userId);
      if(!userId) return;
      this.activityService.getForUser(userId, new Date()).subscribe(activities => {
        this.myActivities = activities;
      });
    });
    this.activityTypeService.getAll().subscribe(activityTypes => {
      this.activityTypes = activityTypes;
    });

  }


}
