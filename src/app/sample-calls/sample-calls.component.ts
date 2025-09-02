import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-sample-calls',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './sample-calls.component.html',
  styleUrls: ['./sample-calls.component.css']
})
export class SampleCallsComponent {
  loading = false;
  responses: { [key: string]: any } = {};

  constructor(private http: HttpClient) {}

  getComponents() {
    this.fetchData('components', 'http://localhost:8080/api/components');
  }

  getComponentTypes() {
    this.fetchData('componentTypes', 'http://localhost:8080/api/component-types');
  }

  getPurchaseOrders() {
    this.fetchData('purchaseOrders', 'http://localhost:8080/api/purchase-orders');
  }

  getQualityStatements() {
    this.fetchData('qualityStatements', 'http://localhost:8080/api/quality-statements');
  }

  getCombinedData() {
    this.fetchData('combinedData', 'http://localhost:8080/api/combined-data');
  }

  fetchData(key: string, url: string) {
    this.loading = true;
    this.http.get(url).subscribe({
      next: (data) => {
        this.responses[key] = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(`Error fetching ${key}`, err);
        this.loading = false;
      }
    });
  }

  closeResponse(key: string) {
    delete this.responses[key];
  }
}
