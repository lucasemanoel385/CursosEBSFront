import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyHomeComponent } from './body-home.component';

describe('BodyHomeComponent', () => {
  let component: BodyHomeComponent;
  let fixture: ComponentFixture<BodyHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
