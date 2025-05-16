import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutLoginCreateComponent } from './layout-login-create.component';

describe('LayoutLoginCreateComponent', () => {
  let component: LayoutLoginCreateComponent;
  let fixture: ComponentFixture<LayoutLoginCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutLoginCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutLoginCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
