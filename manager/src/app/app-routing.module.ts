import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { AuthRoutingModule } from './auth/auth.routing';


const routes: Routes = [
  {
      path: '',
      component: FullComponent,
      children: [
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
          {
              path: 'dashboard',
              loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
          },
          {
              path: 'component',
              loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
          }
      ]
  },
  {
      path: '**',
      redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}



