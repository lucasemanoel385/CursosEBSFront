import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymetMarketPayComponent } from './paymet-market-pay.component';

describe('PaymetMarketPayComponent', () => {
  let component: PaymetMarketPayComponent;
  let fixture: ComponentFixture<PaymetMarketPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymetMarketPayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymetMarketPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
