import { Routes } from '@angular/router';
import { PlannerComponent } from './components/planner/planner.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
    { path: 'settings', component: SettingsComponent },
    { path: 'planning', component: PlannerComponent },
    { path: '**', component: PlannerComponent }
];
