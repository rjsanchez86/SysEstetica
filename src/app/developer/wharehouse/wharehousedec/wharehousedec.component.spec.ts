import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WharehousedecComponent } from './wharehousedec.component';

describe('WharehousedecComponent', () => {
  let component: WharehousedecComponent;
  let fixture: ComponentFixture<WharehousedecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WharehousedecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WharehousedecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
