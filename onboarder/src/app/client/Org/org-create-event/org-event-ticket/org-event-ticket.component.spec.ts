import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgEventTicketComponent } from './org-event-ticket.component';

describe('OrgEventTicketComponent', () => {
  let component: OrgEventTicketComponent;
  let fixture: ComponentFixture<OrgEventTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgEventTicketComponent]
    });
    fixture = TestBed.createComponent(OrgEventTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
