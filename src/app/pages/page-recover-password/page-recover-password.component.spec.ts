import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRecoverPasswordComponent } from './page-recover-password.component';

describe('PageRecoverPasswordComponent', () => {
  let component: PageRecoverPasswordComponent;
  let fixture: ComponentFixture<PageRecoverPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageRecoverPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageRecoverPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
