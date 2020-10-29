import { Component, OnInit } from '@angular/core';

enum PAYMENT_OPTIONS {
  cash, card, bank, wallet, promo
}
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  // showPaymentOptions = {
  //   cash: true,
  //   card: false,
  //   bank: false,
  //   wallet: false,
  //   promo: false
  // }
  selectedPaymentOption = PAYMENT_OPTIONS.card

  PAYMENT_OPTIONS = PAYMENT_OPTIONS

  constructor() { }

  ngOnInit() {
  }
  
  changeSelection(method: PAYMENT_OPTIONS){
    this.selectedPaymentOption = method
  }

}
