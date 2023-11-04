import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

interface MemForm {

  personalInfo: boolean,
  fullName: boolean,
  photo: boolean,
  sex: boolean,
  birthDate: boolean,
  placeOfBirth : boolean,
  civilStatus: boolean,
  religion: boolean,
  address: boolean,
  zip: boolean,
  email: boolean,
  contactNum: boolean,
  facebook: boolean,
    linkedIn: boolean,
    skype: boolean,
    zoom: boolean,
    idLicense: boolean,
    prcNo : boolean,
    prcDate: boolean,
    prcExpiration: boolean,
    studentID: boolean,
    aviation: boolean,
    caap: boolean,
    taxID: boolean,
    EducAttainment: boolean,
    tertiary: boolean,
    tertiaryDegree: boolean,
    tertiaryYear: boolean,
    tertiaryDiploma : boolean,
    masteral: boolean,
    masteralDegree: boolean,
    masteralYear: boolean,
    masteralDiploma: boolean,
    doctoral: boolean,
    doctoralDegree: boolean,
    doctoralYear: boolean,
    doctoralDiploma: boolean,
    employmentDetails: boolean,
    employer: boolean,
    jobTitle: boolean,
    employerAdd: boolean,
    membership: boolean,
    payment: boolean,
    memType1: boolean,
}
@Component({
  selector: 'app-org-members',
  templateUrl: './org-members.component.html',
  styleUrls: ['./org-members.component.css']
})
export class OrgMembersComponent {
  memForm$: Observable<MemForm> | undefined;
  form!:FormGroup
  membersDetails: any[] = [];



  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router,
    ) {
      this.getAllMembers();
    }

    ngOnInit():void{
      this.http.get('http://localhost:5000/api/organization', {
        withCredentials: true
      }).subscribe(
        (memResponse: any) => {
          const _id = memResponse._id;
        this.getMemFormat(_id);
        })
    }

    getMemFormat(_id: string) {

      this.memForm$ = this.http.get<MemForm>(`http://localhost:5000/api/myMemForm/${_id}`);
      this.memForm$.subscribe(data => {
        console.log('API Response:', data);
      });
    }
  
    getMemForm(_id: string): void {
      this.http.get(`http://localhost:5000/api/membershipApplication/${_id}`, { withCredentials: true })
        .subscribe((resultData) => {
          console.log(resultData);
          
  
          // Populate the form controls with the received data
          this.form.patchValue(resultData);
        });
    }

    getAllMembers(): void {
      this.http.get("http://localhost:5000/api/myMembers", {withCredentials: true})
        .subscribe((resultData: any) => {
          console.log(resultData);
          this.membersDetails = resultData;
        });
  
  
    }
}

