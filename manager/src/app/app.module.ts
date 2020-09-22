import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { AuthModule } from './auth/auth.module';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { ComponentsModule } from './component/component.module';

@NgModule({
    declarations: [
      AppComponent,
      NopagefoundComponent
    ],
    imports: [
      BrowserAnimationsModule,
      NgbModule,
      AuthModule,
      PagesModule,
      SharedModule,
      ComponentsModule,
      AppRoutingModule,
      GraphQLModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
