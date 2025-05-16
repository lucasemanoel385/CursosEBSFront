import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSpaIntroComponent } from './page-spa-intro.component';

describe('PageSpaIntroComponent', () => {
  let component: PageSpaIntroComponent;
  let fixture: ComponentFixture<PageSpaIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSpaIntroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSpaIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
