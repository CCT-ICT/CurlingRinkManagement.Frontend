import { Component } from '@angular/core';
import { ActivityTypeEditorComponent } from "../activity-type-editor/activity-type-editor.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ActivityTypeEditorComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

}
