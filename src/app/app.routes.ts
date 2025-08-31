import { Routes } from '@angular/router';
import { InspectionReportComponent } from './inspection-report/inspection-report.component';

export const routes: Routes = [
  { path: 'inspection-report', component: InspectionReportComponent },
  { path: '', redirectTo: '/inspection-report', pathMatch: 'full' }
];
