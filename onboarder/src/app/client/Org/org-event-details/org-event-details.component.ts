import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl  } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

interface regForm {
  _id: string,
  orgID: string,
  orgName: string,
  memID: string,
  memName: string,
  memType: string,
  proofofPayment: string,
  emailAddress: string,
  contactno: string
}

@Component({
  selector: 'app-org-event-details',
  templateUrl: './org-event-details.component.html',
  styleUrls: ['./org-event-details.component.css']
})
export class OrgEventDetailsComponent implements OnInit{
  eventInfo: any[] = [];
  regMemArray: regForm[] = [];
  regMem$: Observable<regForm[]> | undefined;
  proofofPayment: string ='';

  constructor (
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadScript('assets/js/triggermodal.js').then(() => {
      // The JavaScript file is loaded and initialized
    }).catch(error => {
      console.error('Error loading triggermodal.js', error);
    }); 
    this.route.params.subscribe(params => {
      const _id = params['id'];
      this.getEventInfo(_id);
      this.getregMem(_id);
    })
    
  }

  getEventInfo(_id: string) {
    this.http.get(`https://onboarder-git-new-c2258314f05c.herokuapp.com/api/thisevent/${_id}`)
    .subscribe((resultData: any) => {
      console.log(resultData);
      this.eventInfo = [resultData];
    })
  }

  openImage(proofOfPayment: string) {
    this.proofofPayment = proofOfPayment;
}

  getregMem(eventID: string){
    this.regMem$ = this.http.get<regForm[]>(`https://onboarder-git-new-c2258314f05c.herokuapp.com/api/myEventForm/${eventID}`);
    this.regMem$.subscribe((data) => {
      this.regMemArray = data;
      console.log('Registered Members:', data);
    })
  }

  getTrustedUrl(videoUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
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
