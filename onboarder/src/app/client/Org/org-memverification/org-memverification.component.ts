import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-org-memverification',
  templateUrl: './org-memverification.component.html',
  styleUrls: ['./org-memverification.component.css']
})
export class OrgMemverificationComponent {
  membershipApplicationDetails: any[] = [];
  acceptModalId: string = '';
  _id="";
  isVerified = "";


constructor(
  private http: HttpClient, 
  private route: ActivatedRoute,
  private router: Router,
  ) {
    this.getAllMembershipApplication();
  }


  ngOnInit():void{
    this.loadScript('assets/js/accept-reject.js').then(() => {
      // The JavaScript file is loaded and initialized
    }).catch(error => {
      console.error('Error loading accept-reject.js', error);
    });   
  }

  getAllMembershipApplication(): void {
    this.http.get("http://localhost:5000/api/verification", {withCredentials: true})
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.membershipApplicationDetails = resultData;
      });
  }

  setAcceptModalId(id: string): void {
    this.acceptModalId = id;
  }

  accept(_id: string): void{
    const updatedData = { isVerified: true };
    this.http.patch(`http://localhost:5000/api/membershipApplication/${_id}`, updatedData, { withCredentials: true })
      .subscribe((response: any) => {
        // Handle the response as needed, for example, update the UI or show a success message
        console.log('Application verified successfully:', response);
        // Optionally, you can reload the updated data after verification
        this.getAllMembershipApplication();
      }, (error) => {
        // Handle error if the PATCH request fails
        console.error('Error verifying application:', error);
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