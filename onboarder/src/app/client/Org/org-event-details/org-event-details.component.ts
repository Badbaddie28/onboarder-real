import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-org-event-details',
  templateUrl: './org-event-details.component.html',
  styleUrls: ['./org-event-details.component.css']
})
export class OrgEventDetailsComponent implements OnInit{
  eventInfo: any[] = [];

  constructor (
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const orgID = params['orgID'];
      const _id = params['id'];
      this.getEventInfo(orgID, _id);
    })
    
  }

  getEventInfo(orgID: string, _id: string) {
    this.http.get(`http://localhost:5000/api/event/${orgID}/${_id}`)
    .subscribe((resultData: any) => {
      console.log(resultData);
      this.eventInfo = [resultData];
    })
  }
}
