import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './client/Landing_Page/home/home.component';
import { AboutComponent } from './client/Landing_Page/about/about.component';
import { ServicesComponent } from './client/Landing_Page/services/services.component';
import { DevelopersComponent } from './client/Landing_Page/developers/developers.component';
import { OrgLandingComponent } from './client/Org/org-landing/org-landing.component';
import { OrgRegistrationComponent } from './client/Org/org-registration/org-registration.component';
import { MemSignupComponent } from './client/Member/mem-signup/mem-signup.component';
import { MemLoginComponent } from './client/Member/mem-login/mem-login.component';
import { MemLandingComponent } from './client/Member/mem-landing/mem-landing.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'developers', component: DevelopersComponent },
  { path: 'org-landing', component: OrgLandingComponent },
  { path: 'member-landing', component: MemLandingComponent },
  { path: 'org-registration', component: OrgRegistrationComponent },
  { path: 'member-signup', component: MemSignupComponent },
  { path: 'member-login', component: MemLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
