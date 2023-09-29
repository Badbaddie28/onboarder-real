import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { SidebarService } from './../org-navbar/sidebar.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-org-dashboard',
  templateUrl: './org-dashboard.component.html',
  styleUrls: ['./org-dashboard.component.css']
})
export class OrgDashboardComponent implements OnDestroy {
  isSidebarActive = false;
  private sidebarSubscription: Subscription;

  constructor(
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef
    ) {
    this.sidebarSubscription = this.sidebarService.sidebarState$.subscribe(
      (state) => {
        this.isSidebarActive = state;
        this.cdr.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.sidebarSubscription.unsubscribe();
  }
}
