import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PordersComponent } from './porders.component';

describe('PordersComponent', () => {
  let component: PordersComponent;
  let fixture: ComponentFixture<PordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
