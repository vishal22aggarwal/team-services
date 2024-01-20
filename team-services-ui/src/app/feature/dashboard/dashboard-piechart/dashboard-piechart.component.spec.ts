import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPiechartComponent } from './dashboard-piechart.component';

describe('DashboardPiechartComponent', () => {
  let component: DashboardPiechartComponent;
  let fixture: ComponentFixture<DashboardPiechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPiechartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
