import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mem-events',
  templateUrl: './mem-events.component.html',
  styleUrls: ['./mem-events.component.css']
})
export class MemEventsComponent implements OnInit {
  EventArray: any[] = [];

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) {
    this.getAllEvents();
  }
  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents(){
    this.http.get("http://localhost:5000/api/viewevent")
    .subscribe((resultData:any) => {
      console.log(resultData);
      this.EventArray = resultData;
    })
  }

  redirecttoEventDetails(orgID: string, _id: string){
    this.router.navigate(['/member-event-details', orgID, _id]);
  }
}