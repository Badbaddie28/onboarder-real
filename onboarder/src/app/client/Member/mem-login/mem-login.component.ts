import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mem-login',
  templateUrl: './mem-login.component.html',
  styleUrls: ['./mem-login.component.css']
})
export class MemLoginComponent implements OnInit{
  constructor(private router: Router) {}

  ngOnInit(): void {
  }
  
  navigatetoMemDashboard() {
    this.router.navigate(['member-dashboard']);
  }
}