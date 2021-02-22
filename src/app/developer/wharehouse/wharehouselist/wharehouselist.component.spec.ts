import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WharehouselistComponent } from './wharehouselist.component';

describe('WharehouselistComponent', () => {
  let component: WharehouselistComponent;
  let fixture: ComponentFixture<WharehouselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WharehouselistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WharehouselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
