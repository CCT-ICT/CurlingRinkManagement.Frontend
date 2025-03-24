import { Component } from '@angular/core';
import { ActivityTypeModel } from '../../models/activity-type.model';
import { SheetModel } from '../../models/sheet.model';
import { SheetService } from '../../services/sheet.service';
import { ActivityTypeService } from '../../services/activity-type.service';
import { SheetOverviewComponent } from '../sheet-overview/sheet-overview.component';
import { TimeOverviewComponent } from '../time-overview/time-overview.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [ SheetOverviewComponent, TimeOverviewComponent, FormsModule],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.scss'
})
export class PlannerComponent {
  public sheets: SheetModel[] = [];
  public activityTypes: ActivityTypeModel[] = [];

  public dateString:string = "";

  constructor(private sheetService: SheetService, private activityTypeService: ActivityTypeService){}

  ngOnInit(): void {
    let today = new Date();
    this.dateString = today.toISOString().split('T')[0];
    this.loadActivityTypes();
    this.loadSheets();
  }

  private loadActivityTypes() {
    this.activityTypeService.GetAll().subscribe(a => {
      this.activityTypes = a;
    });
  }

  private loadSheets(){
    this.sheetService.GetAll().subscribe(sheets =>{
      this.sheets = sheets;
      this.sheets.sort((s1, s2) => s1.order - s2.order)
    })
  }

}
