import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
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
  selector: 'app-org-memverification',
  templateUrl: './org-memverification.component.html',
  styleUrls: ['./org-memverification.component.css']
})
export class OrgMemverificationComponent {
  memForm$: Observable<MemForm> | undefined;

  form!:FormGroup

  membershipApplicationDetails: any[] = [];
  acceptModalId: string = '';
  rejectModalId: string = '';

  _id="";
  isVerified = "";
  isRejected = "";
  remarks="";
  photo: any;
  tertiaryDiploma: any;
  masteralDiploma: any;
  doctoralDiploma: any;
  payment: any;


constructor(
  private http: HttpClient, 
  private route: ActivatedRoute,
  private router: Router,
  private formBuilder: FormBuilder,
  private sanitizer:DomSanitizer
  ) {
    this.getAllMembershipApplication();
  }


  ngOnInit():void{
    this.loadScript('assets/js/accept-reject.js').then(() => {
      // The JavaScript file is loaded and initialized
    }).catch(error => {
      console.error('Error loading accept-reject.js', error);
    });   

    this.form = this.formBuilder.group({
      remarks: ['', Validators.required],
      
    

      
    })
    this.http.get('http://localhost:5000/api/organization', {
          withCredentials: true
        }).subscribe(
          (memResponse: any) => {
            const _id = memResponse._id;
          this.getMemFormat(_id);
          })


    
  }



  getAllMembershipApplication(): void {
    this.http.get("http://localhost:5000/api/verification", {withCredentials: true})
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.membershipApplicationDetails = resultData;
        this.photo = resultData.photo;
        this.tertiaryDiploma = resultData.tertiaryDiploma1;
      });
  }

  setAcceptModalId(id: string): void {
    this.acceptModalId = id;
  }

  setRejectModalId(id: string): void {
    this.rejectModalId = id;
  }

  accept(_id: string): void{
    const updatedData = { isVerified: true };
    this.http.patch(`http://localhost:5000/api/membershipApplication/${_id}`, updatedData, { withCredentials: true })
      .subscribe((response: any) => {
        // Handle the response as needed, for example, update the UI or show a success message
        console.log('Application verified successfully:', response);
        Swal.fire('Membership Application Accepted')
        // Optionally, you can reload the updated data after verification
        this.getAllMembershipApplication();
      }, (error) => {
        // Handle error if the PATCH request fails
        console.error('Error verifying application:', error);
      });

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

  reject(_id: string): void {
    const remarksControl = this.form.get('remarks');
    
    if (remarksControl) {
      const updatedData = { 
        isRejected: true,
        remarks: remarksControl.value,
      };
    
      this.http.patch(`http://localhost:5000/api/membershipApplication/${_id}`, updatedData, { withCredentials: true })
        .subscribe((response: any) => {
          // Handle the response as needed, for example, update the UI or show a success message
          console.log('Application rejected successfully:', response);
          Swal.fire('Membership Application Rejected');
          // Optionally, you can reload the updated data after rejection
          this.getAllMembershipApplication();
        }, (error) => {
          // Handle error if the PATCH request fails
          console.error('Error rejecting application:', error);
        });
    }
  }

  onChange = ($event: Event, controlName: string) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    this.convertfiletobase64(file, (base64String) => {
      this.form.patchValue({ photo: base64String });
      this.form.patchValue({ masteralDiploma: base64String });
      this.form.patchValue({ doctoralDiploma: base64String });
      this.form.patchValue({ payment: base64String });
        // Set the base64 string to the appropriate form control
        if (controlName === 'photo') {
            this.photo = base64String;
        } else if (controlName === 'tertiaryDiploma') {
            this.tertiaryDiploma = base64String;
        }
        else if (controlName === 'masteralDiploma') {
          this.masteralDiploma = base64String;
        }
        else if (controlName === 'doctoralDiploma') {
          this.doctoralDiploma = base64String;
        }
        else if (controlName === 'payment') {
          this.payment = base64String;
      }
    });
  }

  // Your convertfiletobase64 function
  convertfiletobase64(file: File, callback: (base64string: string) => void) {
    const reader = new FileReader();
    reader.onload = (e) => {
      let base64string = reader.result as string;
      callback(base64string);
    };
    reader.readAsDataURL(file);
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