import { Component } from '@angular/core';

@Component({
  selector: 'app-org-create-event',
  templateUrl: './org-create-event.component.html',
  styleUrls: ['./org-create-event.component.css']
})
export class OrgCreateEventComponent {
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
