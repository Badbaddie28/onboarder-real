import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'app-org-navbar',
  templateUrl: './org-navbar.component.html',
  styleUrls: ['./org-navbar.component.css']
})
export class OrgNavbarComponent implements OnInit {
  organization!: string;

  constructor(private http:HttpClient,
    private router: Router) { }

  ngOnInit(): void {


    this.http.get('http://localhost:5000/api/organization', {
      withCredentials: true
    }).subscribe(
      (res:any) => {
        this.organization = `${res.orgName}`;
    
      },
      (err) => {
        this.organization = "error"
       
    
      }
    )

    // Load and initialize the JavaScript file
    this.loadScript('assets/js/navbar.js').then(() => {
      // The JavaScript file is loaded and initialized
    }).catch(error => {
      console.error('Error loading navbar.js', error);
    });
  }

  logout() {
    this.http.post('http://localhost:5000/api/logout', {withCredentials: true})
      this.router.navigate(['/home']);
      
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
