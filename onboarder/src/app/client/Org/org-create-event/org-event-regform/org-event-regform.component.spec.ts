import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgEventRegformComponent } from './org-event-regform.component';

describe('OrgEventRegformComponent', () => {
  let component: OrgEventRegformComponent;
  let fixture: ComponentFixture<OrgEventRegformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgEventRegformComponent]
    });
    fixture = TestBed.createComponent(OrgEventRegformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
