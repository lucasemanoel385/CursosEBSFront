import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesssonRegisterComponent } from './lessson-register.component';

describe('LesssonRegisterComponent', () => {
  let component: LesssonRegisterComponent;
  let fixture: ComponentFixture<LesssonRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LesssonRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LesssonRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
