import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';
import { ProjectComponent } from './project/project.component';
import { ServiceComponent } from './service/service.component';
import { SkillComponent } from './skill/skill.component';
import { SocialNetworkComponent } from './social-network/social-network.component';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';

/**
 * Allows to enable correctly scrollbar on sidebar.
 */
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { ComponentsModule } from '../component/component.module';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    PagesComponent,
    ExperienceComponent,
    EducationComponent,
    PhoneNumberComponent,
    ProfileComponent,
    ProjectComponent,
    ServiceComponent,
    SkillComponent,
    SocialNetworkComponent
  ],
  imports: [
    ComponentsModule,
    SharedModule,
    CommonModule,
    BrowserModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PerfectScrollbarModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class PagesModule { }
