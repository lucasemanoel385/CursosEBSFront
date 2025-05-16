import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesIdComponent } from './courses-id.component';

describe('CoursesIdComponent', () => {
  let component: CoursesIdComponent;
  let fixture: ComponentFixture<CoursesIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
