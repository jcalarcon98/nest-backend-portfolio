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
import { ToastComponent } from './toast/toast.component';

export const ComponentsRoutes: Routes = [
  {
    path: 'progressbar',
    component: NgbdpregressbarBasicComponent,
  },
  {
    path: 'pagination',
    component: NgbdpaginationBasicComponent,

  },
  {
    path: 'accordion',
    component: NgbdAccordionBasicComponent,
  },
  {
    path: 'alert',
    component: NgbdAlertBasicComponent
  },
  {
    path: 'carousel',
    component: NgbdCarouselBasicComponent
  },
  {
    path: 'datepicker',
    component: NgbdDatepickerBasicComponent
  },
  {
    path: 'dropdown',
    component: NgbdDropdownBasicComponent
  },
  {
    path: 'modal',
    component: NgbdModalBasicComponent
  },
  {
    path: 'poptool',
    component: NgbdPopTooltipComponent
  },
  {
    path: 'rating',
    component: NgbdratingBasicComponent
  },
  {
    path: 'tabs',
    component: NgbdtabsBasicComponent
  },
  {
    path: 'timepicker',
    component: NgbdtimepickerBasicComponent
  },
  {
    path: 'typehead',
    component: NgbdtypeheadBasicComponent
  },
  {
    path: 'buttons',
    component: ButtonsComponent
  },
  {
    path: 'toast',
    component: ToastComponent
  },
];
