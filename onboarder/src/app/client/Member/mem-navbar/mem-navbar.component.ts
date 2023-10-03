import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mem-navbar',
  templateUrl: './mem-navbar.component.html',
  styleUrls: ['./mem-navbar.component.css']
})
export class MemNavbarComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    // Load and initialize the JavaScript file
    this.loadScript('assets/js/navbar.js').then(() => {
      // The JavaScript file is loaded and initialized
    }).catch(error => {
      console.error('Error loading navbar.js', error);
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