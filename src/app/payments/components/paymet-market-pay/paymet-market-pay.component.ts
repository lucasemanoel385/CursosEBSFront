import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../service/PaymentService.service';
import { ActivatedRoute } from '@angular/router';

declare var MercadoPago: any;

@Component({
  selector: 'app-paymet-market-pay',
  standalone: true,
  imports: [],
  templateUrl: './paymet-market-pay.component.html',
  styleUrl: './paymet-market-pay.component.scss'
})
export class PaymetMarketPayComponent implements OnInit {

  constructor(private http: HttpClient, private paymentService: PaymentService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
      console.log("Success")
    }
}