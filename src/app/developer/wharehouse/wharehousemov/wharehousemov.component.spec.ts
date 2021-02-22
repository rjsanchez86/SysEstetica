import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WharehousemovComponent } from './wharehousemov.component';

describe('WharehousemovComponent', () => {
  let component: WharehousemovComponent;
  let fixture: ComponentFixture<WharehousemovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WharehousemovComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WharehousemovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
