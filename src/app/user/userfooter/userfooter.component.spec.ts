import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserfooterComponent } from './userfooter.component';

describe('UserfooterComponent', () => {
  let component: UserfooterComponent;
  let fixture: ComponentFixture<UserfooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserfooterComponent]
    });
    fixture = TestBed.createComponent(UserfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
