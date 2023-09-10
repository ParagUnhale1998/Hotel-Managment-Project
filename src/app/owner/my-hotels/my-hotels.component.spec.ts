import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHotelsComponent } from './my-hotels.component';

describe('MyHotelsComponent', () => {
  let component: MyHotelsComponent;
  let fixture: ComponentFixture<MyHotelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyHotelsComponent]
    });
    fixture = TestBed.createComponent(MyHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
