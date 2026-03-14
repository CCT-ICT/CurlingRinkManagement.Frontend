import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { ActivityTypeService } from '../../services/activity-type.service';
import { ActivityTypeModel } from '../../models/activity-type.model';
import { ActivityModel } from '../../models/activity.model';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-user-home',
  imports: [],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss'
})
export class UserHomeComponent implements OnInit {
  public activityTypes: ActivityTypeModel[] = [];
  public myActivities: ActivityModel[] = [];

  constructor(private activityService: ActivityService, private activityTypeService: ActivityTypeService, private oauthService: OAuthService) { }

  ngOnInit(): void {
    this.activityTypeService.getAll().subscribe(activityTypes => {
      this.activityTypes = activityTypes;
    });
    let userId = this.getUserId();
    if (userId) {
      this.activityService.getForUser(userId, new Date()).subscribe(activities => {
        this.myActivities = activities;
      });
    }
  }

  private getUserId(): string | null {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['sub'];
  }

}
