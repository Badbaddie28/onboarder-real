import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemDashboardComponent } from './mem-dashboard.component';

describe('MemDashboardComponent', () => {
  let component: MemDashboardComponent;
  let fixture: ComponentFixture<MemDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemDashboardComponent]
    });
    fixture = TestBed.createComponent(MemDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
