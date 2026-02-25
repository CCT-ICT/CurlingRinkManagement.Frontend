import { Component, EventEmitter, Input, input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SheetService } from '../../services/sheet.service';
import { SheetModel } from '../../models/sheet.model';

@Component({
  selector: 'app-sheet-selector',
  imports: [],
  templateUrl: './sheet-selector.component.html',
  styleUrl: './sheet-selector.component.scss'
})
export class SheetSelectorComponent implements OnInit, OnChanges {

  public sheets: SheetModel[] = [];
  @Input()
  public preSelectedSheetId: string | null = null;

  public selectedSheet: SheetModel | null = null;

  @Output()
  public selectedSheetChange = new EventEmitter<SheetModel | null>();

  constructor(private sheetService: SheetService) { }


  ngOnInit(): void {
    this.loadSheets();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sheets.length == 0) return;
    if (changes['preSelectedSheetId']) {
      this.selectedSheet = this.sheets.find(s => s.id === this.preSelectedSheetId) ?? null;
    }
  }

  private loadSheets() {
    this.sheetService.getAll().subscribe((sheets) => {
      this.sheets = sheets;
      if (this.selectedSheet == null && this.preSelectedSheetId != null) {
        this.selectedSheet = this.sheets.find(s => s.id === this.preSelectedSheetId) ?? null;
      }
      if (this.selectedSheet == null) {
        this.selectedSheet = this.sheets.length > 0 ? this.sheets[0] : null;
      }
    });
  }

  onSheetChange(selectedId: string) {
    this.preSelectedSheetId = null;
    this.selectedSheet = this.sheets.find(s => s.id === selectedId) ?? null;
    this.selectedSheetChange.emit(this.selectedSheet);
  }

}
