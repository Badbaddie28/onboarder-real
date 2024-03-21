import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}
   urlAPI = environment.apiUrl

  ngOnInit(): void {
    
  }
  
  navigatetoOrg() {
    this.router.navigate(['org-landing']);
  }

  navigatetoMem() {
    this.router.navigate(['member-landing']);
  }
}
