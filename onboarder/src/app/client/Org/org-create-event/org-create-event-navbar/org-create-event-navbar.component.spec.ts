import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgCreateEventNavbarComponent } from './org-create-event-navbar.component';

describe('OrgCreateEventNavbarComponent', () => {
  let component: OrgCreateEventNavbarComponent;
  let fixture: ComponentFixture<OrgCreateEventNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgCreateEventNavbarComponent]
    });
    fixture = TestBed.createComponent(OrgCreateEventNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
