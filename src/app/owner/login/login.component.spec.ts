import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerLoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: OwnerLoginComponent;
  let fixture: ComponentFixture<OwnerLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerLoginComponent]
    });
    fixture = TestBed.createComponent(OwnerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
