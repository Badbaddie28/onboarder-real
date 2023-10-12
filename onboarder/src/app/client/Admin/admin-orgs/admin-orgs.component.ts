import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-orgs',
  templateUrl: './admin-orgs.component.html',
  styleUrls: ['./admin-orgs.component.css']
})
export class AdminOrgsComponent {
  OrganizationArray : any[] =[];

  constructor(private http: HttpClient){
    this.getAllOrganization();
  }
  
  getAllOrganization(){
    this.http.get("http://localhost:5000/api/vieworganization")
    .subscribe((resultData: any)=>
    {
      console.log(resultData);
      this.OrganizationArray = resultData;
    })
  }
}
