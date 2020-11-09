import { Component, OnInit } from '@angular/core';
import { MaprouteService } from 'src/app/_services/maproute.service';
import { ApiServiceProxy, InternationalbookingServiceProxy } from 'src/app/_services/service-proxies';
import { StoreService, InternationalRoute } from 'src/app/_services/store.service';
import * as moment from 'moment'
import { InternationalBooking, ShipmentDeliveryTypeResource } from 'src/app/_models/service-models';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
  booking: InternationalBooking;
  country: InternationalRoute = {}
  shipmentType = new ShipmentDeliveryTypeResource()
  totalPayment = 0
  constructor(
    private routeService: MaprouteService,
    private store: StoreService,
    private internationalBookingService: InternationalbookingServiceProxy,
    private apiService: ApiServiceProxy,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }internationalRouteService

  ngOnInit() {
    this.routeService.addressStart = "7, Amore street, off Freedom way, Lekki, Lagos";
    this.routeService.addressEnd = "13, Church street, Makoko Lagos"
    this.booking = this.store.getInternationalBookings()
    this.store.getInternationalRoutes().subscribe(data => {
      this.country = data.find(country => {
        return country.country == this.booking.country
      })
      this.totalPayment = this.country.adminFee + this.booking.estimatedPackageWeight * this.country.importRatePerUnitWeight * this.country.exchangeRate
    })
    this.internationalBookingService.intlbookingdeliverytypes().subscribe(data => {
      this.shipmentType = data.data.find(deliveryType => deliveryType.id == this.booking.shipmentDeliveryTypeId)
    })
  }

  async submit(){5000
    const booking = this.booking
    if(booking.eta) booking.eta = new Date(booking.eta)
    const loading = await this.loadingController.create({
      message: "please wait...",
      translucent: true,
      spinner: "bubbles",
    })
    loading.present()
    this.internationalBookingService.createIntlBooking(this.booking).subscribe(async(data) => {
      loading.dismiss()
      if(data.code == '000'){
        if(this.booking.hasHoldInstruction){
          this.internationalBookingService.createHoldInstruction(this.booking.holdInstruction).subscribe(async(data) => {
            this.finishCreation()
        })
      } else {
        this.finishCreation()
      }
      } else {
        const toast = await this.toastController.create({
          message: data.message,
          duration: 2000
        });
        toast.present();
      }
    })
  }

  async finishCreation(){
    this.loadingController.dismiss()
    const toast = await this.toastController.create({
      message: 'Booking created successfully',
      duration: 2000
    });
    toast.present();
    this.router.navigate(['/orders'])
  }

}
