import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatTableModule
} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { SaveConfirmationDialogComponent } from '../save-confirmation-dialog/save-confirmation-dialog.component';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ImageUploadComponent} from '../image-upload/image-upload.component';
import {ComponentClass} from '../models/ComponentClass';
import {QualityStatementData} from '../models/QualityStatement';
import {Router} from '@angular/router';

interface CombinedData {
  ComponentTypeID: string;
  ServiceOrderID: string;
  Components: ComponentClass[];
  QualityStatements: QualityStatementData[];
}

@Component({
  selector: 'app-inspection-report',
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    ImageUploadComponent,
    NgSwitchDefault,
    NgIf
  ],
  templateUrl: './inspection-report.component.html',
  styleUrls: ['./inspection-report.component.css']
})
export class InspectionReportComponent implements OnInit {
  dataSource: CombinedData[] = [];
  displayedColumns: string[] = ['group','statement'];
  imagePreviews: { [componentId_qualityStatementId: string]: string } = {};

  loading = true;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router ) {}

  ngOnInit() {
    this.http.get<CombinedData[]>('http://localhost:8080/api/combined-data').subscribe({
      next: (data) => {
        this.dataSource = data;
        console.log("DATA LOADED FROM BACKEND:", data)
        if (this.dataSource.length > 0) {
          this.displayedColumns = [...this.displayedColumns, ...this.dataSource[0].Components.map(c => c.ComponentID.toString())];
        }
        this.loading = false;
      },
      error: (err) => console.error(err)
    });
  }

  updateValue(componentId: string, statement: QualityStatementData, event: any, outcomeType: string) {
    let newValue: any;
    if (outcomeType === 'flag') {
      newValue = event.checked;
    } else {
      newValue = event.target ? event.target.value : null;
    }
    statement.Values = { ...statement.Values, [componentId]: newValue };

    console.log("DATA UPDATED", statement.Values);
  }

  onPictureUploaded(componentId: string, qualityStatementId: number, imageRef: string): void {
    const key = `${componentId}_${qualityStatementId}`;
    this.imagePreviews = { ...this.imagePreviews, [key]: imageRef };

    console.log("IMAGE UPLOADED", this.imagePreviews);
  }

  saveReport() {
    this.dialog.open(SaveConfirmationDialogComponent, {
      width: '300px',
      data: { message: 'Report saved successfully!' }
    });

    this.dataSource.forEach(combinedData => {
      combinedData.QualityStatements.forEach(statement => {
        Object.keys(statement.Values).forEach(componentId => {
          const val = statement.Values[componentId];
          if (typeof val === 'boolean') {
            statement.Values[componentId] = false;
          } else {
            statement.Values[componentId] = '';
          }
        });

      });
    });

    this.imagePreviews = {};

    console.log('Cleared all text fields and images, keeping the table structure:', this.dataSource);
  }

  goToSampleCalls() {
    this.router.navigate(['/sample-calls']);
  }
}
