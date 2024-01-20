import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAddPopupComponent } from './table-add-popup.component';

describe('TableAddPopupComponent', () => {
  let component: TableAddPopupComponent;
  let fixture: ComponentFixture<TableAddPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableAddPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
