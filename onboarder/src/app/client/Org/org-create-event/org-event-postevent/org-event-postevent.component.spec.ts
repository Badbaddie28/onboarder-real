import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgEventPosteventComponent } from './org-event-postevent.component';

describe('OrgEventPosteventComponent', () => {
  let component: OrgEventPosteventComponent;
  let fixture: ComponentFixture<OrgEventPosteventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgEventPosteventComponent]
    });
    fixture = TestBed.createComponent(OrgEventPosteventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
