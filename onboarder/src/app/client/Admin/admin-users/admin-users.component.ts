import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {
  private apiUrl = environment.apiUrl;
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
  this.http.get(`${this.apiUrl}api/viewmember`)
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
    "_id" : this._id,
    "firstName" : this.firstName,
    "lastName" : this.lastName,
    "email" : this.email,
    "dateCreated" : this.dateCreated
  };

  this.http.patch("http://localhost:5000/api/member" + "/" + this._id, memberData).subscribe((resultData:any)=>
  {
    console.log(resultData);
    this.getAllMember();
  })
}

setDelete(data:any) {
  this._id = data._id;
  this.firstName= data.firstName;
  this.lastName = data.lastName;
  this.email = data.email;
  this.dateCreated = data.dateCreated;
}

deleteMember(){
  let memberData = {
    "_id" : this._id,
    "firstName" : this.firstName,
    "lastName" : this.lastName,
    "email" : this.email,
    "dateCreated" : this.dateCreated
  };

  this.http.delete(`${this.apiUrl}api/member` + "/" + this._id).subscribe((resultData:any)=>
  {
    console.log(resultData);
    this.getAllMember();
  })
}

ngOnInit(): void {
  // Load and initialize the JavaScript file
  this.loadScript('assets/js/admin-user.js').then(() => {
    // The JavaScript file is loaded and initialized
  }).catch(error => {
    console.error('Error loading admin-user.js', error);
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
