import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SheetTimeInput as SheetTimeInput } from '../../models/date-time-input.model';
import moment from 'moment';
import { SheetService } from '../../services/sheet.service';
import { SheetModel } from '../../models/sheet.model';
import { ActivityTypeModel } from '../../models/activity-type.model';
import { UserService } from '../../../../../common-api/src/public-api';
import { User } from '../../../../../common-api/src/lib/models/user.model';
import { SheetSelectorComponent } from "../sheet-selector/sheet-selector.component";
import { UserSelectorComponent } from "../user-selector/user-selector.component";

@Component({
  selector: 'app-multi-date-select',
  standalone: true,
  imports: [FormsModule, SheetSelectorComponent, UserSelectorComponent],
  templateUrl: './multi-date-select.component.html',
  styleUrl: './multi-date-select.component.scss'
})
export class MultiSheetActivitySelectComponent {


  @Input()
  public sheetTimeInput: SheetTimeInput[] = []
  @Input()
  public currentActivityType: ActivityTypeModel = new ActivityTypeModel();

  @Output()
  public sheetTimeInputChange: EventEmitter<SheetTimeInput[]> = new EventEmitter();



  constructor() { }



  public removeDate(index: number) {
    if (this.sheetTimeInput.length === 1) return;

    this.sheetTimeInput.splice(index, 1);
  }

  public addDate() {
    if (this.sheetTimeInput.length == 0) {
      this.sheetTimeInput.push(new SheetTimeInput(new Date(), new Date(), null, []));
    }

    if (this.sheetTimeInput.length < 2 || this.sheetTimeInput[this.sheetTimeInput.length - 1].date === "" || this.sheetTimeInput[this.sheetTimeInput.length - 2].date === "") {
      this.sheetTimeInput.push({
        date: this.sheetTimeInput[this.sheetTimeInput.length - 1].date,
        startTime: this.sheetTimeInput[this.sheetTimeInput.length - 1].startTime,
        endTime: this.sheetTimeInput[this.sheetTimeInput.length - 1].endTime,
        sheetId: this.sheetTimeInput[this.sheetTimeInput.length - 1].sheetId,
        instructorIds: []
      });
      return;
    }

    let d1 = new Date(this.sheetTimeInput[this.sheetTimeInput.length - 2].date)
    let d2 = new Date(this.sheetTimeInput[this.sheetTimeInput.length - 1].date)
    let interval = d2.getTime() - d1.getTime();
    let intervalInDays = Math.round(interval / (1000 * 3600 * 24));
    d2.setDate(d2.getDate() + intervalInDays);

    this.sheetTimeInput.push({
      date: moment(d2).format('yyyy-MM-DD'),
      startTime: this.sheetTimeInput[this.sheetTimeInput.length - 1].startTime,
      endTime: this.sheetTimeInput[this.sheetTimeInput.length - 1].endTime,
      sheetId: this.sheetTimeInput[this.sheetTimeInput.length - 1].sheetId,
      instructorIds: []
    })
  }

  removeInstructor(sheetIndex:number, instructorIndex: number) {
    this.sheetTimeInput[sheetIndex].instructorIds.splice(instructorIndex, 1);
  }

  public addInstructor(sheetTimeInput: SheetTimeInput) {
    sheetTimeInput.instructorIds.push('');
  }
  public onSheetChange(sheet: SheetModel | null, index: number) {
    this.sheetTimeInput[index].sheetId = sheet?.id || null;
  }
}
