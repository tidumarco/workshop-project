import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ServiceOrder} from './models/ServiceOrder';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  serviceOrders: ServiceOrder[] = [];

  title: string = 'Workshop Project';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<ServiceOrder[]>('/assets/serviceOrders.json').subscribe({
      next: (data: ServiceOrder[]) => {
        this.serviceOrders = data;
        console.log('Service Orders loaded:', this.serviceOrders);
      },
      error: (err: any) => {
        console.error('Error fetching service orders:', err);
      }
    });
  }
}
