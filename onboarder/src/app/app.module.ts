import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './client/Landing_Page/home/home.component';
import { AboutComponent } from './client/Landing_Page/about/about.component';
import { ServicesComponent } from './client/Landing_Page/services/services.component';
import { DevelopersComponent } from './client/Landing_Page/developers/developers.component';
import { OrgRegistrationComponent } from './client/Org/org-registration/org-registration.component';
import { OrgLandingComponent } from './client/Org/org-landing/org-landing.component';
import { MemRegistrationComponent } from './client/Member/mem-registration/mem-registration.component';
import { MemLandingComponent } from './client/Member/mem-landing/mem-landing.component';
import { MemSignupComponent } from './client/Member/mem-signup/mem-signup.component';
import { MemLoginComponent } from './client/Member/mem-login/mem-login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    DevelopersComponent,
    OrgRegistrationComponent,
    OrgLandingComponent,
    MemRegistrationComponent,
    MemLandingComponent,
    MemSignupComponent,
    MemLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
