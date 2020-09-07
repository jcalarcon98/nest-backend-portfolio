import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './component.routing';
import { NgbdpregressbarBasicComponent } from './progressbar/progressbar.component';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAccordionBasicComponent } from './accordion/accordion.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';
import { NgbdCarouselBasicComponent } from './carousel/carousel.component';
import { NgbdDatepickerBasicComponent } from './datepicker/datepicker.component';
import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdModalBasicComponent } from './modal/modal.component';
import { NgbdPopTooltipComponent } from './popover-tooltip/popover-tooltip.component';
import { NgbdratingBasicComponent } from './rating/rating.component';
import { NgbdtabsBasicComponent } from './tabs/tabs.component';
import { NgbdtimepickerBasicComponent } from './timepicker/timepicker.component';
import { NgbdtypeheadBasicComponent } from './typehead/typehead.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { ToastComponent } from './toast/toast.component';
import { ToastsContainer } from './toast/toast-container';
import { ProjectComponent } from './project/project.component';
import { SkillComponent } from './skill/skill.component';
import { ServiceComponent } from './service/service.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';
import { SocialNetworkComponent } from './social-network/social-network.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(ComponentsRoutes),
		FormsModule,
		ReactiveFormsModule,
		NgbModule
	],
	declarations: [
		NgbdpregressbarBasicComponent,
		NgbdpaginationBasicComponent,
		NgbdAccordionBasicComponent,
		NgbdAlertBasicComponent,
		NgbdCarouselBasicComponent,
		NgbdDatepickerBasicComponent,
		NgbdDropdownBasicComponent,
		NgbdModalBasicComponent,
		NgbdPopTooltipComponent,
		NgbdratingBasicComponent,
		NgbdtabsBasicComponent,
		NgbdtimepickerBasicComponent,
		NgbdtypeheadBasicComponent,
		ButtonsComponent,
		CardsComponent,
		ToastComponent,
		ToastsContainer,
		ProjectComponent,
		SkillComponent,
		ServiceComponent,
		ExperienceComponent,
		EducationComponent,
		PhoneNumberComponent,
		SocialNetworkComponent,
		ProfileComponent
	]
})
export class ComponentsModule {}
