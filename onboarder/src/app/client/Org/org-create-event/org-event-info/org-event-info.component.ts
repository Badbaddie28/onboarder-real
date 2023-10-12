import { Component } from '@angular/core';

@Component({
  selector: 'app-org-event-info',
  templateUrl: './org-event-info.component.html',
  styleUrls: ['./org-event-info.component.css']
})
export class OrgEventInfoComponent {
  activeButton: number = 1; // Default to Button 1 active state
  isSmallScreen = false;
  isSideNavOpen = true;


  onButtonClicked(buttonNumber: number) {
    this.activeButton = buttonNumber;
  }
}
