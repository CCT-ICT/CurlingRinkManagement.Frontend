import { Routes } from '@angular/router';
import { PlannerComponent } from './components/planner/planner.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ContactOverviewComponent } from './components/contact-overview/contact-overview.component';
import { RequestOverviewComponent } from './components/request-overview/request-overview.component';
import { UserOverviewComponent } from './components/user-overview/user-overview.component';
import { UserHomeComponent } from './components/user-home/user-home.component';

export const routes: Routes = [
    { path: 'settings', component: SettingsComponent },
    { path: 'planning', component: PlannerComponent },
    { path: 'contacts', component: ContactOverviewComponent },
    { path: 'requests', component: RequestOverviewComponent },
    { path: 'users', component: UserOverviewComponent },
    { path: 'home', component: UserHomeComponent },
    { path: '**', component: PlannerComponent }
];
