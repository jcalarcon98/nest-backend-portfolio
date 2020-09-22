import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectComponent } from './project/project.component';
import { ServiceComponent } from './service/service.component';
import { SkillComponent } from './skill/skill.component';
import { SocialNetworkComponent } from './social-network/social-network.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [

  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent, data: {title: 'Dashboard'}},
      { path: 'education', component: EducationComponent, data: {title: 'Education'}},
      { path: 'experience', component: ExperienceComponent, data: {title: 'Experience'}},
      { path: 'phone-numbers', component: PhoneNumberComponent, data: {title: 'Phone Numbers'}},
      { path: 'profile', component: ProfileComponent, data: {title: 'Profile'}},
      { path: 'projects', component: ProjectComponent, data: {title: 'Projects'}},
      { path: 'services', component: ServiceComponent, data: {title: 'Services'}},
      { path: 'skills', component: SkillComponent, data: {title: 'Experiences'}},
      { path: 'social-networks', component: SocialNetworkComponent, data: {title: 'Social Networks'}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
