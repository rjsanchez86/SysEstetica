import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpordersComponent } from './listporders.component';

describe('ListpordersComponent', () => {
  let component: ListpordersComponent;
  let fixture: ComponentFixture<ListpordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
