import { Component } from '@angular/core';
import { ActivityTypeEditorComponent } from "../activity-type-editor/activity-type-editor.component";
import { SheetEditorComponent } from "../sheet-editor/sheet-editor.component";

@Component({
    selector: 'app-settings',
    standalone:true,
    imports: [ActivityTypeEditorComponent, SheetEditorComponent],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export class SettingsComponent {

}
