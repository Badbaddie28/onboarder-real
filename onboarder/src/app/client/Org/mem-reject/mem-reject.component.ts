import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mem-reject',
  templateUrl: './mem-reject.component.html',
  styleUrls: ['./mem-reject.component.css']
})
export class MemRejectComponent {
  rejectedApplicationDetails: any[] = [];
constructor(
  private http: HttpClient, 
  private route: ActivatedRoute,
  private router: Router,
  ) {
    this.getAllApplication();
  }

  getAllApplication(): void {
    this.http.get("http://localhost:5000/api/rejected", {withCredentials: true})
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.rejectedApplicationDetails = resultData;
      });


  }
}

