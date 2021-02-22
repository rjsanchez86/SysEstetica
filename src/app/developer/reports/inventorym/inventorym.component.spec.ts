import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorymComponent } from './inventorym.component';

describe('InventorymComponent', () => {
  let component: InventorymComponent;
  let fixture: ComponentFixture<InventorymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorymComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
