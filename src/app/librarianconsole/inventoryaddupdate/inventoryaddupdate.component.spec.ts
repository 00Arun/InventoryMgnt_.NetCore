import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryaddupdateComponent } from './inventoryaddupdate.component';

describe('InventoryaddupdateComponent', () => {
  let component: InventoryaddupdateComponent;
  let fixture: ComponentFixture<InventoryaddupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryaddupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryaddupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
