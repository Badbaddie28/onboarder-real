import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { HttpClient } from '@angular/common/http';

declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'app-org-create-event',
  templateUrl: './org-create-event.component.html',
  styleUrls: ['./org-create-event.component.css']
})


export class OrgCreateEventComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router
  ) {}
  form!: FormGroup
  activeButton: number = 1; // Default to Button 1 active state
  isSmallScreen = false;
  isSideNavOpen = true;


  onButtonClicked(buttonNumber: number) {
    this.activeButton = buttonNumber;
  }


    ngOnInit(): void {
      this.form = this.formBuilder.group({
        eventTitle: ['', Validators.required],
        eventDesc: ['', Validators.required],
        eventDate : ['', Validators.required],
        eventTime: ['', Validators.required],
        location: ['', Validators.required],
        meetingURL: ['', Validators.required],
        poster: ['', Validators.required],
        programme: ['', Validators.required],
        video: ['', Validators.required],
        eventSeats: ['', Validators.required],
        eventPrice: ['', Validators.required],
        eventPaymentDetails: ['', Validators.required]
      })
      // Load and initialize the JavaScript file
      this.loadScript('assets/js/createevent.js').then(() => {
        // The JavaScript file is loaded and initialized
      }).catch(error => {
        console.error('Error loading createeventphotoupload.js', error);
      });
    }

    onChange = ($event: Event) => {
      const target = $event.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      this.convertfiletobase64(file, (base64String) => {
        // Set the base64 string to the logo form control
        this.form.get('poster')?.setValue(base64String);
        this.form.get('programme')?.setValue(base64String);
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

    submit() {
      // Get the event data from the form
      const event = this.form.getRawValue();
      // Fetch organization details
      this.http.get('http://localhost:5000/api/organization', {
        withCredentials: true
      }).subscribe(
        (orgResponse: any) => {
          console.log('Org Response:', orgResponse, event);
    
          // Extract organization ID from the response
          const orgID = orgResponse._id;
          const orgName = orgResponse.orgName;
          
          // Assuming the organization ID is stored in the "_id" field
    
          // Create an object with organization ID and event data
          const eventData = {
            orgID: orgID,
            orgName: orgName,
            eventTitle: event.eventTitle,
            eventDesc: event.eventDesc,
            eventDate: event.eventDate,
            eventTime: event.eventTime,
            location: event.location,
            meetingURL: event.meetingURL,
            poster: event.poster,
            programme: event.programme,
            video: event.video,
            eventSeats: event.eventSeats,
            eventPrice: event.eventPrice,
            eventPaymentDetails: event.eventPaymentDetails
          };          
    
          // Post the event data to the createEvent API endpoint
          this.http.post('http://localhost:5000/api/createEvent', eventData, {
            withCredentials: true
          }).subscribe(
            (eventResponse: any) => {
              console.log('Event created successfully', eventResponse)
            },
            (err) => {
              console.log(err);
            }
          );
        },
        (orgError) => {
          console.error('Error fetching organization details:', orgError);
        }
      );
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
  

