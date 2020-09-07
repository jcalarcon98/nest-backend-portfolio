import { Routes } from '@angular/router';

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
import { ProjectComponent } from './project/project.component';
import { ServiceComponent } from './service/service.component';
import { SkillComponent } from './skill/skill.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';
import { SocialNetworkComponent } from './social-network/social-network.component';
import { ProfileComponent } from './profile/profile.component';

export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'progressbar',
				component: NgbdpregressbarBasicComponent,
				data: {
					title: 'Progressbar',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Progressbar' }
					]
				}
			},
			{
				path: 'profile',
				component: ProfileComponent,
				data: {
					title: 'Personal Profile',
					urls: [
						{ title: 'Dashboard', url: '/profile' },
						{ title: 'ngComponent' },
						{ title: 'Personal Profile' }
					]
				}
			},
			{
				path: 'projects',
				component: ProjectComponent,
				data: {
					title: 'Projects',
					urls: [
						{ title: 'Dashboard', url: '/projects' },
						{ title: 'ngComponent' },
						{ title: 'Projects' }
					]
				}
			},
			{
				path: 'services',
				component: ServiceComponent,
				data: {
					title: 'Services',
					urls: [
						{ title: 'Dashboard', url: '/services' },
						{ title: 'ngComponent' },
						{ title: 'Services' }
					]
				}
			},
			{
				path: 'skills',
				component: SkillComponent,
				data: {
					title: 'Skills',
					urls: [
						{ title: 'Dashboard', url: '/skills' },
						{ title: 'ngComponent' },
						{ title: 'Skills' }
					]
				}
			},
			{
				path: 'experience',
				component: ExperienceComponent,
				data: {
					title: 'Experience',
					urls: [
						{ title: 'Dashboard', url: '/experience' },
						{ title: 'ngComponent' },
						{ title: 'Experience' }
					]
				}
			},
			{
				path: 'education',
				component: EducationComponent,
				data: {
					title: 'Education',
					urls: [
						{ title: 'Dashboard', url: '/education' },
						{ title: 'ngComponent' },
						{ title: 'Education' }
					]
				}
			},
			{
				path: 'phones',
				component: PhoneNumberComponent,
				data: {
					title: 'Phone Numbers',
					urls: [
						{ title: 'Dashboard', url: '/phones' },
						{ title: 'ngComponent' },
						{ title: 'Phone Numbers' }
					]
				}
			},
			{
				path: 'social',
				component: SocialNetworkComponent,
				data: {
					title: 'Social Networks',
					urls: [
						{ title: 'Dashboard', url: '/social' },
						{ title: 'ngComponent' },
						{ title: 'Social Networks' }
					]
				}
			},
			{
				path: 'pagination',
				component: NgbdpaginationBasicComponent,
				data: {
					title: 'Pagination',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Pagination' }
					]
				}
			},
			{
				path: 'accordion',
				component: NgbdAccordionBasicComponent,
				data: {
					title: 'Accordion',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Accordion' }
					]
				}
			},
			{
				path: 'alert',
				component: NgbdAlertBasicComponent,
				data: {
					title: 'Alert',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Alert' }
					]
				}
			},
			{
				path: 'carousel',
				component: NgbdCarouselBasicComponent,
				data: {
					title: 'Carousel',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Carousel' }
					]
				}
			},
			{
				path: 'datepicker',
				component: NgbdDatepickerBasicComponent,
				data: {
					title: 'Datepicker',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Datepicker' }
					]
				}
			},
			{
				path: 'dropdown',
				component: NgbdDropdownBasicComponent,
				data: {
					title: 'Dropdown',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Dropdown' }
					]
				}
			},
			{
				path: 'modal',
				component: NgbdModalBasicComponent,
				data: {
					title: 'Modal',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Modal' }
					]
				}
			},
			{
				path: 'poptool',
				component: NgbdPopTooltipComponent,
				data: {
					title: 'Popover & Tooltip',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Popover & Tooltip' }
					]
				}
			},
			{
				path: 'rating',
				component: NgbdratingBasicComponent,
				data: {
					title: 'Rating',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Rating' }
					]
				}
			},
			{
				path: 'tabs',
				component: NgbdtabsBasicComponent,
				data: {
					title: 'Tabs',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Tabs' }
					]
				}
			},
			{
				path: 'timepicker',
				component: NgbdtimepickerBasicComponent,
				data: {
					title: 'Timepicker',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Timepicker' }
					]
				}
			},
			{
				path: 'typehead',
				component: NgbdtypeheadBasicComponent,
				data: {
					title: 'Typehead',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Typehead' }
					]
				}
			},
			{
				path: 'buttons',
				component: ButtonsComponent,
				data: {
					title: 'Button',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Button' }
					]
				}
			},
			{
				path: 'toast',
				component: ToastComponent,
				data: {
					title: 'Toast',
				}
			}
		]
	}
];
