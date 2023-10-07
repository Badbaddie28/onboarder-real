import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './client/Landing_Page/home/home.component';
import { AboutComponent } from './client/Landing_Page/about/about.component';
import { ServicesComponent } from './client/Landing_Page/services/services.component';
import { DevelopersComponent } from './client/Landing_Page/developers/developers.component';
import { OrgLandingComponent } from './client/Org/org-landing/org-landing.component';
import { OrgRegistrationComponent } from './client/Org/org-registration/org-registration.component';
import { MemberSignupComponent } from './client/Member/mem-signup/mem-signup.component';
import { MemLoginComponent } from './client/Member/mem-login/mem-login.component';
import { MemLandingComponent } from './client/Member/mem-landing/mem-landing.component';
import { OrgLoginComponent } from './client/Org/org-login/org-login.component';
import { OrgEventsComponent } from './client/Org/org-events/org-events.component';
import { OrgCommunityComponent } from './client/Org/org-community/org-community.component';
import { OrgMemformsComponent } from './client/Org/org-memforms/org-memforms.component';
import { OrgMemverificationComponent } from './client/Org/org-memverification/org-memverification.component';
import { OrgMembersComponent } from './client/Org/org-members/org-members.component';
import { OrgProfileComponent } from './client/Org/org-profile/org-profile.component';
import { MemDashboardComponent } from './client/Member/mem-dashboard/mem-dashboard.component';
import { MemEventsComponent } from './client/Member/mem-events/mem-events.component';
import { MemOrganizationComponent } from './client/Member/mem-organization/mem-organization.component';
import { MemProfileComponent } from './client/Member/mem-profile/mem-profile.component';
import { OrgCreateEventComponent } from './client/Org/org-create-event/org-create-event.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'developers', component: DevelopersComponent },
  { path: 'org-landing', component: OrgLandingComponent },
  { path: 'org-login', component: OrgLoginComponent },  
  { path: 'org-registration', component: OrgRegistrationComponent },
  { path: 'org-memforms', component: OrgMemformsComponent },
  { path: 'org-memverification', component: OrgMemverificationComponent },
  { path: 'org-members', component: OrgMembersComponent },
  { path: 'org-community', component: OrgCommunityComponent },
  { path: 'org-events', component: OrgEventsComponent},
  { path: 'org-profile', component: OrgProfileComponent },
  { path: 'org-create-event', component: OrgCreateEventComponent },

  { path: 'member-landing', component: MemLandingComponent },
  { path: 'member-signup', component: MemberSignupComponent },
  { path: 'member-login', component: MemLoginComponent },
  { path: 'member-dashboard', component: MemDashboardComponent},
  { path: 'member-events', component: MemEventsComponent},
  { path: 'member-organization', component: MemOrganizationComponent},
  { path: 'member-profile', component: MemProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
