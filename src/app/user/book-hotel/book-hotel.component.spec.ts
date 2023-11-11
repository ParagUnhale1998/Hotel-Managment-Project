import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookHotelComponent } from './book-hotel.component';

describe('BookHotelComponent', () => {
  let component: BookHotelComponent;
  let fixture: ComponentFixture<BookHotelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookHotelComponent]
    });
    fixture = TestBed.createComponent(BookHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
