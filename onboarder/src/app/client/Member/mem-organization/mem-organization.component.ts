import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mem-organization',
  templateUrl: './mem-organization.component.html',
  styleUrls: ['./mem-organization.component.css']
})
export class MemOrganizationComponent implements OnInit{
  OrganizationArray: any[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.getAllOrganization();
  }

  getAllOrganization() {
    this.http.get("http://localhost:5000/api/vieworganization")
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.OrganizationArray = resultData;
      });
  }

  redirectToOrgProfile(orgId: string) {
    this.router.navigate(['/member-orgprofile', orgId]);
  }
  ngOnInit(): void {
    // Load and initialize the JavaScript file
    this.loadScript('assets/js/mem-org.js').then(() => {
      // The JavaScript file is loaded and initialized
    }).catch(error => {
      console.error('Error loading mem-org.js', error);
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
