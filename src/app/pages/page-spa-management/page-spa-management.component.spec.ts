import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSpaManagementComponent } from './page-spa-management.component';

describe('PageSpaManagementComponent', () => {
  let component: PageSpaManagementComponent;
  let fixture: ComponentFixture<PageSpaManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSpaManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSpaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
