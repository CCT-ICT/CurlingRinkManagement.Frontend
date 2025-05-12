import { Component, OnInit } from '@angular/core';
import { SheetModel } from '../../models/sheet.model';
import { SheetService } from '../../services/sheet.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sheet-editor',
  imports: [FormsModule],
  templateUrl: './sheet-editor.component.html',
  styleUrl: './sheet-editor.component.scss'
})
export class SheetEditorComponent implements OnInit {

  public sheets: SheetModel[] = [];
  public error: string | null = null;
  public saveSuccess: boolean = false;
  public saving: boolean = false;

  constructor(private sheetService: SheetService) { }

  ngOnInit(): void {
    this.loadSheets();
  }

  private loadSheets() {
    this.sheetService.getAll().subscribe(sheets => {
      this.sheets = sheets;
      this.sheets.sort((s1, s2) => s1.order - s2.order)
    })
  }

  addSheet() {
    var newSheet = new SheetModel();
    newSheet.id = "00000000-0000-0000-0000-000000000000";
    this.sheets.push(newSheet);
  }

  updateSheets() {
    let counter = 0;
    let total = this.sheets.length;
    this.saving = true;
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
    for (let i = 0; i < this.sheets.length; i++) {
      const sheet = this.sheets[i];
      sheet.order = i;
      if (sheet.id == "00000000-0000-0000-0000-000000000000") {
        sheet.id = crypto.randomUUID();
        this.sheetService.create(sheet).subscribe({ next: counterIncrease, error: counterError });
      } else {
        this.sheetService.update(sheet).subscribe({ next: counterIncrease, error: counterError });
      }
    }
  }
}
