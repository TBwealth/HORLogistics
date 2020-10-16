import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerspartneroption',
  templateUrl: './customerspartneroption.page.html',
  styleUrls: ['./customerspartneroption.page.scss'],
})
export class CustomerspartneroptionPage implements OnInit {

  constructor(private router: Router) { }
  gotoOnboarding(customerType){
    this.router.navigate(['register'],{queryParams:{custType:customerType}})
  }
  ngOnInit() {
  }

}
