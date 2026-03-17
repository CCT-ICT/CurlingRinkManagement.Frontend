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
  imports: [FormsModule, SheetOverviewComponent, TimeOverviewComponent],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.scss'
})
export class PlannerComponent {



  public sheets: SheetModel[] = [];
  public selectedSheets: SheetModel[] = [];
  public activityTypes: ActivityTypeModel[] = [];

  public dateString: string = "";
  public showAmountOfSheets: number = 5;
  public sheetIndexOffset: number = 0;

  constructor(private sheetService: SheetService, private activityTypeService: ActivityTypeService) { }

  ngOnInit(): void {
    let today = new Date();
    this.dateString = today.toISOString().split('T')[0];
    this.loadActivityTypes();
    this.loadSheets();
  }

  private loadActivityTypes() {
    this.activityTypeService.getAll().subscribe(a => {
      this.activityTypes = a;
    });
  }

  private loadSheets() {
    this.sheetService.getAll().subscribe(sheets => {
      this.sheets = sheets;

      this.sheets.sort((s1, s2) => s1.order - s2.order)
      this.selectedSheets = this.sheets.slice(this.sheetIndexOffset, this.sheetIndexOffset + this.showAmountOfSheets);
    })
  }

  reload() {
    this.sheets = [];
    this.loadSheets();
  }

  canGoPrevious(): boolean {
    return this.sheetIndexOffset > 0;
  }

  previousSheets() {
    if (!this.canGoPrevious()) return;
    this.sheetIndexOffset -= 1;
    this.selectedSheets = this.sheets.slice(this.sheetIndexOffset, this.sheetIndexOffset + this.showAmountOfSheets);

  }



  canGoNext(): boolean {
    return this.sheetIndexOffset + this.showAmountOfSheets < this.sheets.length;
  }

  nextSheets() {
    if (!this.canGoNext()) return;
    this.sheetIndexOffset += 1;
    this.selectedSheets = this.sheets.slice(this.sheetIndexOffset, this.sheetIndexOffset + this.showAmountOfSheets);
  }
}
