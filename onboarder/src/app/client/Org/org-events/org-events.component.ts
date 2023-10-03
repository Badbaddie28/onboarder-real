import { Component } from '@angular/core';

@Component({
  selector: 'app-org-events',
  templateUrl: './org-events.component.html',
  styleUrls: ['./org-events.component.css']
})
export class OrgEventsComponent{
  links = [
    { label: 'Basic Info', url: '/basic-info' },
    { label: 'Details', url: '/details' },
    { label: 'Tickets', url: '/tickets' },
    { label: 'Registration Forn', url: '/regform' },
    { label: 'Post Event', url: '/post-event' }
  ];

  showNavLinks = false;

  toggleNavLinks() {
    this.showNavLinks = !this.showNavLinks;
  }
}
