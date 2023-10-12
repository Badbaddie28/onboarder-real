import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgEventInfoComponent } from './org-event-info.component';

describe('OrgEventInfoComponent', () => {
  let component: OrgEventInfoComponent;
  let fixture: ComponentFixture<OrgEventInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgEventInfoComponent]
    });
    fixture = TestBed.createComponent(OrgEventInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
