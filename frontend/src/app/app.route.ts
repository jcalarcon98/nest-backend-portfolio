import { Routes, RouterModule } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { Page3Component } from './page3/page3.component';


const PAGE_ROUTES: Routes = [
    { path: '', component: Page1Component },
    { path: 'pagina2', component: Page2Component },
    { path: 'pagina3', component: Page3Component },
    { path: '**', component: Page1Component },
];

export const PAGE_ROUTING = RouterModule.forRoot(PAGE_ROUTES);
