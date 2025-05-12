import { Component, OnInit } from '@angular/core';
import { ActivityTypeService } from '../../services/activity-type.service';
import { ActivityTypeModel } from '../../models/activity-type.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activity-type-editor',
  imports: [FormsModule],
  templateUrl: './activity-type-editor.component.html',
  styleUrl: './activity-type-editor.component.scss'
})
export class ActivityTypeEditorComponent implements OnInit {

  public activityTypes: ActivityTypeModel[] = [];

  public error: string | null = null;
  public saveSuccess: boolean = false;
  public saving: boolean = false;

  constructor(private activityTypeService: ActivityTypeService) { }


  ngOnInit(): void {
    this.activityTypeService.getAll().subscribe({
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
    this.activityTypeService.delete(this.activityTypes[index].id);
    this.activityTypes.splice(index, 1);
  }

  addActivityType() {
    var newActivity = new ActivityTypeModel();
    newActivity.id = "00000000-0000-0000-0000-000000000000";
    this.activityTypes.push(newActivity);
  }

  updateActivityTypes() {
    this.saving = true;
    let counter = 0;
    let total = this.activityTypes.length;
    let counterIncrease = () => {
      counter++;
      this.saveSuccess = counter === total;
      if (this.saveSuccess) {
        this.saving = false;
      }
    }
    let counterError = (error: any) => {
      this.error = "Something went wrong saving";
      console.log(error);
      this.saving = false;
    }
    this.activityTypes.forEach(activityType => {
      if (activityType.id == "00000000-0000-0000-0000-000000000000") {
        activityType.id = crypto.randomUUID();
        this.activityTypeService.create(activityType).subscribe({ next: counterIncrease, error: counterError });
      } else {
        this.activityTypeService.update(activityType).subscribe({ next: counterIncrease, error: counterError });
      }
    });
  }
}
