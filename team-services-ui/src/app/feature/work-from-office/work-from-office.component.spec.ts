import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFromOfficeComponent } from './work-from-office.component';

describe('WorkFromOfficeComponent', () => {
  let component: WorkFromOfficeComponent;
  let fixture: ComponentFixture<WorkFromOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkFromOfficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkFromOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
