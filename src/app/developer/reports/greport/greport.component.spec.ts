import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreportComponent } from './greport.component';

describe('GreportComponent', () => {
  let component: GreportComponent;
  let fixture: ComponentFixture<GreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
