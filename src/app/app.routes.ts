import { Routes } from '@angular/router';
import { InspectionReportComponent } from './inspection-report/inspection-report.component';
import {SampleCallsComponent} from './sample-calls/sample-calls.component';

export const routes: Routes = [
  { path: 'inspection-report', component: InspectionReportComponent },
  { path: 'sample-calls', component: SampleCallsComponent },
  { path: '', redirectTo: '/inspection-report', pathMatch: 'full' }
];
