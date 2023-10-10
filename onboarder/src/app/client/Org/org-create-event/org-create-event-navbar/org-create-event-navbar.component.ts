import { Component } from '@angular/core';

@Component({
  selector: 'app-org-create-event-navbar',
  templateUrl: './org-create-event-navbar.component.html',
  styleUrls: ['./org-create-event-navbar.component.css']
})
export class OrgCreateEventNavbarComponent {
  links = [
    { label: 'Basic Info', url: '/basic-info' },
    { label: 'Details', url: '/details' },
    { label: 'Tickets', url: '/tickets' },
    { label: 'Registration Form', url: '/regform' },
    { label: 'Post Event', url: '/post-event' }
  ];

  showNavLinks = false;

  toggleNavLinks() {
    this.showNavLinks = !this.showNavLinks;
  }
}
