import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

interface MemForm {

  personalInfo: boolean;
  fullName: boolean;
  sex: boolean;
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
      memType2: boolean,
      memType3: boolean,
      memType1Details: boolean,
      memType2Details: boolean,
      memType3Details: boolean,
      memType1Fee: boolean,
      memType2Fee: boolean,
      memType3Fee: boolean,
      memType1Process: boolean,



  memType1Input: String,
      memType2Input: String,
      memType3Input: String,
      memType1DetailsInput: String,
      memType2DetailsInput: String,
      memType3DetailsInput: String,
      memType1FeeInput: String,
      memType2FeeInput: String,
      memType3FeeInput: String,
      memType1ProcessInput: String,
      


}

@Component({
  selector: 'app-mem-orgmemform',
  templateUrl: './mem-orgmemform.component.html',
  styleUrls: ['./mem-orgmemform.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemOrgmemformComponent implements OnInit {
  memForm$: Observable<MemForm> | undefined;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const _id = params['id'];
      this.getMemForm(_id);
     });
    
  }
  getMemForm(_id: string) {
    this.memForm$ = this.http.get<MemForm>(`http://localhost:5000/api/myMemForm/${_id}`);
    this.memForm$.subscribe(data => {
      console.log('API Response:', data);
    });
  }
  

   
  
  
}
