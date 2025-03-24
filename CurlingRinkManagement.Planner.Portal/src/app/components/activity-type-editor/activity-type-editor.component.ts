import { Component, OnInit } from '@angular/core';
import { ActivityTypeService } from '../../services/activity-type.service';
import { ActivityTypeModel } from '../../models/activity-type.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activity-type-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './activity-type-editor.component.html',
  styleUrl: './activity-type-editor.component.scss'
})
export class ActivityTypeEditorComponent implements OnInit {

  public activityTypes: ActivityTypeModel[] = [];

  public error: string | null = null;

  constructor(private activityTypeService: ActivityTypeService) { }


  ngOnInit(): void {
    this.activityTypeService.GetAll().subscribe({
      next: (activityTypes) => {
        this.activityTypes = activityTypes;
        this.activityTypes.sort((a, b) => {
          if (a.type.toLowerCase() < b.type.toLowerCase()) {
            return -1;
          }
          if (a.type.toLowerCase() > b.type.toLowerCase()) {
            return 1;
          }
          return 0;
        })
      },
      error: (err) => {
        this.error = "Problem retreiving activity types"
      }
    })
  }

  //TODO [BK] Implement actual deletion
  deleteActivityType(index: number) {
    this.activityTypes.splice(index, 1);
  }

  addActivityType() {
    var newActivity = new ActivityTypeModel();
    newActivity.id = "00000000-0000-0000-0000-000000000000";
    this.activityTypes.push(newActivity);
  }

  updateActivityTypes() {
    this.activityTypes.forEach(activityType => {
      if (activityType.id == "00000000-0000-0000-0000-000000000000") {
        activityType.id = crypto.randomUUID();
        this.activityTypeService.Create(activityType).subscribe();
      } else {
        this.activityTypeService.Update(activityType).subscribe();
      }
    });
  }
}
