import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-org-memverification',
  templateUrl: './org-memverification.component.html',
  styleUrls: ['./org-memverification.component.css']
})
export class OrgMemverificationComponent {
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
      
      photo: new FormControl(false),
      fullName: new FormControl(false),
      sex: new FormControl(false),
      personalInfo: new FormControl(false),
      birthDate: new FormControl(false),
      placeOfBirth : new FormControl(false),
      civilStatus: new FormControl(false),
      religion: new FormControl(false),
      address: new FormControl(false),
      zip: new FormControl(false),
      email: new FormControl(false),
      contactNum: new FormControl(false),
      facebook: new FormControl(false),
      linkedIn: new FormControl(false),
      skype: new FormControl(false),
      zoom: new FormControl(false),
      idLicense: new FormControl(false),
      prcNo : new FormControl(false),
      prcDate: new FormControl(false),
      prcExpiration: new FormControl(false),
      studentID: new FormControl(false),
      aviation: new FormControl(false),
      caap: new FormControl(false),
      taxID: new FormControl(false),
      EducAttainment: new FormControl(false),
      tertiary: new FormControl(false),
      tertiaryDegree: new FormControl(false),
      tertiaryYear: new FormControl(false),
      tertiaryDiploma : new FormControl(false),
      masteral: new FormControl(false),
      masteralDegree: new FormControl(false),
      masteralYear: new FormControl(false),
      masteralDiploma: new FormControl(false),
      doctoral: new FormControl(false),
      doctoralDegree: new FormControl(false),
      doctoralYear: new FormControl(false),
      doctoralDiploma: new FormControl(false),
      employmentDetails: new FormControl(false),
      employer: new FormControl(false),
      jobTitle: new FormControl(false),
      employerAdd: new FormControl(false),
      membership: new FormControl(false),
      memType1: new FormControl(false),
      memType2: new FormControl(false),
      memType3: new FormControl(false),
      memType1Details: new FormControl(false),
      memType2Details: new FormControl(false),
      memType3Details: new FormControl(false),
      memType1Fee: new FormControl(false),
      memType2Fee: new FormControl(false),
      memType3Fee: new FormControl(false),
      memType1Process: new FormControl(false),
    
      payment: new FormControl(false),

      
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