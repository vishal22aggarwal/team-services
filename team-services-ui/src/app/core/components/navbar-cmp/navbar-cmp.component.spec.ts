import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCmpComponent } from './navbar-cmp.component';

describe('NavbarCmpComponent', () => {
  let component: NavbarCmpComponent;
  let fixture: ComponentFixture<NavbarCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarCmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
