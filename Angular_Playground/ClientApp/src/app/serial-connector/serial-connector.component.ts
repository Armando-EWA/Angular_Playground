import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-serial-connector',
  templateUrl: './serial-connector.component.html',
  styleUrls: ['./serial-connector.component.css']
})
export class SerialConnectorComponent implements OnInit {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit(): void {
    // Initialize your component here, if needed
  }

  // A new simple function to test HTTP GET
  simpleGet(): void {
    console.log('Attempting a simple GET request'); // Debugging line
    console.log('Base URL:', this.baseUrl); // Debugging line
    console.log('Request URL:', this.baseUrl + 'serialcomm/simple-test'); // Debugging line

    this.http.get<any>(this.baseUrl + 'serialcomm/simple-test').subscribe(
      (data) => {
        console.log('Simple GET request succeeded'); // Debugging line
        console.log(data); // Debugging line
        // Handle the response data here
      },
      (error) => {
        console.error('Simple GET request failed'); // Debugging line
        console.error(error); // Debugging line
        // Handle errors here
      }
    );
  }
  /**
   * Method to test a given COM port.
   * @param {string} portName - The name of the port to test
   */
  testPort(portName: string) {
    // Make a GET request to test the port.
    // Subscribe to handle successful and error cases.
    this.http.get(`serialcomm/test-port/${portName}`).subscribe(
      data => {
        // Handle successful response
        console.log(`Successfully tested port: ${portName}`);
        console.log(data);
      },
      (error) => {
        // Handle error response
        console.error(`Failed to test port: ${portName}`);
        console.error(error);
      }
    );
  }

  /**
   * Method to open a given COM port.
   * @param {string} portName - The name of the port to open
   */
  openPort(portName: string) {
    // Log the attempt to open the port
    console.log(`Attempting to open port ${portName}`);

    // Make a POST request to open the port.
    // Subscribe to handle successful and error cases.
    this.http.post(`serialcomm/open-port`, portName).subscribe(
      data => {
        // Handle successful response
        console.log(`Successfully opened port: ${portName}`);
        console.log(data);
      },
      (error) => {
        // Handle error response
        console.error(`Failed to open port: ${portName}`);
        console.error(error);
      }
    );
  }

  /**
   * Method to close the COM port.
   */
  closePort() {
    // Make a POST request to close the port.
    // Subscribe to handle successful and error cases.
    this.http.post(`/api/serialcomm/close-port`, {}).subscribe(
      data => {
        // Handle successful response
        console.log(`Successfully closed port`);
        console.log(data);
      },
      (error) => {
        // Handle error response
        console.error(`Failed to close port`);
        console.error(error);
      }
    );
  }
}
