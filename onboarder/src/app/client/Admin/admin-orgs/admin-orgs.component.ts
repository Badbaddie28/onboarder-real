import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-orgs',
  templateUrl: './admin-orgs.component.html',
  styleUrls: ['./admin-orgs.component.css']
})
export class AdminOrgsComponent {
  OrganizationArray : any[] =[];
  _id = "";
  orgName = "";
  orgType = "";
  email = "";
  dateCreated: any;

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

  setUpdate(data:any)
  {
    this._id = data._id;
    this.orgName = data.orgName;
    this.orgType = data.orgType;
    this.email = data.email;
    this.dateCreated = data.dateCreated;
  }

  updateOrganization(){
    let orgData = {
      "Org ID" : this._id,
      "Org Name" : this.orgName,
      "Org Type" : this.orgType,
      "Org Email" : this.email,
      "Date Created" : this.dateCreated
    };

    this.http.patch("http://localhost:5000/api/organization" + "/" + this._id, orgData).subscribe((resultData:any)=>
    {
      console.log(resultData);
      this.getAllOrganization();
    })
  }

  setDelete(data:any) {
    this.http.delete("http://localhost:5000/api/organization" + "/" + data._id).subscribe((resultData: any)=>
    {
      console.log(resultData);
      this.getAllOrganization();
    })
  }
}
