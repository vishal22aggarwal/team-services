import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBarchartComponent } from './dashboard-barchart.component';

describe('DashboardBarchartComponent', () => {
  let component: DashboardBarchartComponent;
  let fixture: ComponentFixture<DashboardBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardBarchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
