import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'app-org-registration',
  templateUrl: './org-registration.component.html',
  styleUrls: ['./org-registration.component.css']
})
export class OrgRegistrationComponent implements OnInit {
  
  form!:FormGroup

  isStep1Valid = false;
  isStep2Valid = false;
  isStep3Valid = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router
    ) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      orgName: ['', Validators.required],
      orgType: ['', Validators.required],
      orgEmail: ['', Validators.required],
      password: ['', Validators.required],
      about: ['', Validators.required],
      orgHistory: ['', Validators.required],
      mission: ['', Validators.required],
      vision: ['', Validators.required],
      coreValues: ['', Validators.required]
  });

  this.isStep1Valid = true;
  this.isStep2Valid = true;
  this.isStep3Valid = true;
  



    // Load and initialize the JavaScript file
    this.loadScript('assets/js/org-reg.js').then(() => {
      // The JavaScript file is loaded and initialized
    }).catch(error => {
      console.error('Error loading org-reg.js', error);
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

  

  ValidateEmail = (orgEmail: any) => {
 
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (orgEmail.match(validRegex)) {  
  
      return true;
  
    } else {
  
      return false;
  
    }
  
  }

  validateStep1() {
    const organization = this.form.getRawValue();
    if (organization.orgName === "" || organization.orgType === "" || organization.orgEmail === "" || organization.password === "") {
      Swal.fire("Error", "Please fill up all the required fields in Step 1.", "error");
      this.isStep1Valid = false;
    } else if (!this.ValidateEmail(organization.orgEmail)) {
      Swal.fire('Error', 'Please enter a valid email address', 'error');
      this.isStep1Valid = false;
    } else {
      this.isStep1Valid = true;
    }
  }


  validateStep2() {
    const organization = this.form.getRawValue();
    if (organization.about === "" || organization.orgHistory === "") {
      Swal.fire("Error", "Please fill up all the required fields in Step 2.", "error");
      this.isStep2Valid = false;
    } else {
      this.isStep2Valid = true;
    }
  }

  validateStep3() {
    const organization = this.form.getRawValue();
    if (organization.mission === "" || organization.vision === "" || organization.coreValues === "") {
      Swal.fire("Error", "Please fill up all the required fields in Step 3.", "error");
      this.isStep3Valid = false;
    } else {
      this.isStep3Valid = true;
    }
  }

  submit() {
    const organization = this.form.getRawValue();
    if (!this.isStep1Valid) {
      // Step 1 validation failed, show an error message
      Swal.fire("Error", "Please complete Step 1 before proceeding.", "error");
    } else if (!this.isStep2Valid) {
      // Step 2 validation failed, show an error message
      Swal.fire("Error", "Please complete Step 2 before proceeding.", "error");
    } else if (!this.isStep3Valid) {
      // Step 3 validation failed, show an error message
      Swal.fire("Error", "Please complete Step 3 before proceeding.", "error");
    } else {
      // All steps are valid, proceed with form submission
      this.http
        .post('http://localhost:5000/api/orgRegister', organization, {
          withCredentials: true,
        })
        .subscribe(
          () => {
            // Successful request, dispatch a custom event
            const successEvent = new Event('postRequestSuccess');
            document.dispatchEvent(successEvent);
          },
          (err) => {
            Swal.fire("Error", err.error.message, 'error');
          }
        );
    }
  }

  
  navigatetoHome() {
    this.router.navigate(['home']);
  }

  navigatetoLogin() {
    this.router.navigate(['org-login']);
  }
}
