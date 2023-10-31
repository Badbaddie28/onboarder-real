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
  placceOfBirth : boolean,
  civilStatus: boolean,
  religion: boolean,
  address: boolean,
  zip: boolean,
  email: boolean,
  contactNum: boolean,
  employmentDetails: boolean,
  employer: boolean,
  jobTitle: boolean,
  employerAdd: boolean,
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
