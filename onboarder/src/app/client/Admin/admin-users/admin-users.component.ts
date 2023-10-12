import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {
MemberArray : any[] =[];

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

}
