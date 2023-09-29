import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-org-navbar',
  templateUrl: './org-navbar.component.html',
  styleUrls: ['./org-navbar.component.css']
})
export class OrgNavbarComponent implements OnInit {
  constructor(private SidebarService: SidebarService) { }
  
  toggleSidebar() {
    this.SidebarService.toggleSidebar();
  }
  
  ngOnInit(): void {
  }
}
