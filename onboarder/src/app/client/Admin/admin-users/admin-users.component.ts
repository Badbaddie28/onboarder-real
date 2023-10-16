import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {
MemberArray : any[] =[];
_id = "";
firstName = "";
lastName = "";
email = "";
dateCreated = "";

constructor(private http: HttpClient){
  this.getAllMember();
}

getAllMember(){
  this.http.get("http://localhost:5000/api/viewmember")
  .subscribe((resultData: any)=>
  {
    console.log(resultData);
    this.MemberArray = resultData;
  })
}

setUpdate(data:any) 
{
  this._id = data._id;
  this.firstName= data.firstName;
  this.lastName = data.lastName;
  this.email = data.email;
  this.dateCreated = data.dateCreated;
}

updateMember(){
  let memberData = {
    "Member ID" : this._id,
    "First Name" : this.firstName,
    "Last Name" : this.lastName,
    "Email" : this.email,
    "Date Created" : this.dateCreated
  };

  this.http.patch("http://localhost:5000/api/member" + "/" + this._id, memberData).subscribe((resultData:any)=>
  {
    console.log(resultData);
    this.getAllMember();
  })
}

setDelete(data:any) {
  this.http.delete("http://localhost:5000/api/member" + "/" +data._id).subscribe((resultData:any)=>
  {
    console.log(resultData);
    this.getAllMember();
  })
}

}
