import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupaddupdateComponent } from './signupaddupdate.component';

describe('SignupaddupdateComponent', () => {
  let component: SignupaddupdateComponent;
  let fixture: ComponentFixture<SignupaddupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupaddupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupaddupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
