import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-org-login',
  templateUrl: './org-login.component.html',
  styleUrls: ['./org-login.component.css']
})
export class OrgLoginComponent implements OnInit{
  constructor(private router: Router) {}

  ngOnInit(): void {
  }
  
  navigatetoOrgCommunity() {
    this.router.navigate(['org-community']);
  }
}
