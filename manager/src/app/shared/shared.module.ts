import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { NavigationComponent } from './header-navigation/navigation.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SpinnerComponent } from './spinner.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    BreadcrumbComponent,
    NavigationComponent,
    SidebarComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgbModule,
    RouterModule,
  ],
  exports: [
    BreadcrumbComponent,
    NavigationComponent,
    SidebarComponent,
    SpinnerComponent
  ],
  providers: [
  ]
})
export class SharedModule { }
