import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder} from '@angular/forms'
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
  
  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router
    ) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
       orgName :"", 
       orgType :"", 
       orgEmail :"", 
       password :"", 
       about :"", 
       orgHistory :"", 
       mission :"", 
       vision :"", 
       coreValues :"",     })


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

  submit() {
    let organization = this.form.getRawValue()
    console.log(organization)
    if(organization.orgName == "" || organization.orgType == "" || organization.orgEmail == "" || organization.password == "" || organization.about == "" || organization.orgHistory == "" ||organization.mission == "" || organization.vision == "" || organization.coreValues == "" ){
      Swal.fire("Error", "Please fill up all the required fields.", "error")
    }
  else if(!this.ValidateEmail(organization.orgEmail)){
 
    Swal.fire('Error', 'Please enter a valid email address', 'error');

  } else {

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

  navigatetoLanding() {
    this.router.navigate(['org-landing']);
  }
}
