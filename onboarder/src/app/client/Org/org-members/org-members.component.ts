import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-org-members',
  templateUrl: './org-members.component.html',
  styleUrls: ['./org-members.component.css']
})
export class OrgMembersComponent {
  membersDetails: any[] = [];



  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router,
    ) {
      this.getAllMembers();
    }

    getAllMembers(): void {
      this.http.get("http://localhost:5000/api/myMembers", {withCredentials: true})
        .subscribe((resultData: any) => {
          console.log(resultData);
          this.membersDetails = resultData;
        });
  
  
    }
}

