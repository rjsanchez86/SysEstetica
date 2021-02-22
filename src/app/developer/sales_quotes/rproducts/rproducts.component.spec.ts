import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RproductsComponent } from './rproducts.component';

describe('RproductsComponent', () => {
  let component: RproductsComponent;
  let fixture: ComponentFixture<RproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RproductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
