import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { PAGE_ROUTING } from './app.route';
import { AppComponent } from './app.component';
import { Page3Component } from './page3/page3.component';

@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    Page2Component,
    Page3Component
  ],
  imports: [
    BrowserModule,
    PAGE_ROUTING
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
