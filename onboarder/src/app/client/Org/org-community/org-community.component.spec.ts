import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgCommunityComponent } from './org-community.component';

describe('OrgCommunityComponent', () => {
  let component: OrgCommunityComponent;
  let fixture: ComponentFixture<OrgCommunityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgCommunityComponent]
    });
    fixture = TestBed.createComponent(OrgCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
