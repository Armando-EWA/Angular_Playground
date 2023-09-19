import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    // Move the HTTP call to a separate method for reusability
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    console.log('Base URL:', this.baseUrl); // Debugging line
    console.log('Request URL:', this.baseUrl + 'weatherforecast'); // Debugging line

    this.http.get<WeatherForecast[]>(this.baseUrl + 'weatherforecast').subscribe(result => {
      console.log('Received data:', result); // Debugging line
      this.forecasts = result;
    }, error => {
      console.error('Error occurred:', error); // Debugging line
    });
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
