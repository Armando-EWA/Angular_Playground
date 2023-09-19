// Import the BrowserModule from Angular's platform-browser package.
// BrowserModule is essential for running any Angular web application as it provides services for building and rendering the DOM.
import { BrowserModule } from '@angular/platform-browser';

// Import the NgModule decorator from Angular core.
// This is used to define a module that encapsulates components, directives, pipes, and services.
import { NgModule } from '@angular/core';

// Import the FormsModule for working with forms in Angular.
// It provides necessary directives like ngModel to work with form elements.
import { FormsModule } from '@angular/forms';

// Import HttpClientModule for making HTTP requests.
// This module includes the HttpClient service that we can use to perform HTTP operations.
import { HttpClientModule } from '@angular/common/http';

// Import RouterModule to define routes in our Angular application.
// It provides features for navigating between different components.
import { RouterModule } from '@angular/router';

// Import the AppComponent from the current directory.
// This is the root component of the application.
import { AppComponent } from './app.component';

// Import the NavMenuComponent for the navigation menu.
// This will likely provide a navigation bar or side menu.
import { NavMenuComponent } from './nav-menu/nav-menu.component';

// Import the HomeComponent aka the Landing page
import { HomeComponent } from './home/home.component';

// Import the CounterComponent
import { CounterComponent } from './counter/counter.component';

// Import the FetchDataComponent
import { FetchDataComponent } from './fetch-data/fetch-data.component';

// Import the SerialConnectorComponent, used for serial port communication or similar functionality.
import { SerialConnectorComponent } from './serial-connector/serial-connector.component';

// Define the AppModule class and decorate it with the NgModule decorator.
// This class is the entry point for Angular to know what to bootstrap and what to inject.
@NgModule({
  // Place all the components, directives, and pipes that the module should manage.
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    SerialConnectorComponent
  ],
  // List of modules to import into this module. 
  // Everything from the imported modules is available to declarations in this module.
  imports: [
    // Configure the BrowserModule for server-side rendering with the Angular Universal.
    // 'ng-cli-universal' is the application ID used for differentiating multiple apps if needed.
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    // Configure routes for the Angular Router.
    // The routes define which components should be displayed for different URL paths.
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'serial-connector', component: SerialConnectorComponent }
    ])
  ],
  // List of injectable services that are available in the injector of this module.
  providers: [],
  // Specify the main application view, called the root component, that hosts all other app views.
  // Angular creates it and inserts it into the index.html host web page.
  bootstrap: [AppComponent]
})
// Define the AppModule class. This class serves as a container for organizing various aspects of the Angular application.
export class AppModule { }
