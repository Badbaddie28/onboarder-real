import { Component } from '@angular/core';

declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'app-org-create-event',
  templateUrl: './org-create-event.component.html',
  styleUrls: ['./org-create-event.component.css']
})
export class OrgCreateEventComponent {
  activeButton: number = 1; // Default to Button 1 active state
  isSmallScreen = false;
  isSideNavOpen = true;


  onButtonClicked(buttonNumber: number) {
    this.activeButton = buttonNumber;
  }

  
    ngOnInit(): void {
      // Load and initialize the JavaScript file
      this.loadScript('assets/js/createevent.js').then(() => {
        // The JavaScript file is loaded and initialized
      }).catch(error => {
        console.error('Error loading createeventphotoupload.jss', error);
      });
    }
  
    private loadScript(scriptUrl: string): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        const scriptElement = document.createElement('script');
        scriptElement.src = scriptUrl;
        scriptElement.type = 'text/javascript';
        scriptElement.onload = () => resolve(); // Change this line
        scriptElement.onerror = (error) => reject(error); // Change this line
        document.body.appendChild(scriptElement);
      });
    }
  }
  

