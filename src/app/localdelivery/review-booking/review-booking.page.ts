import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { LocalBooking, LocalRouteRate,MarkOrderAsRecieved } from 'src/app/_models/service-models';
import { AuthenticationService, CUSTOMER_TYPES } from 'src/app/_services/authentication.service';
import { MaprouteService } from 'src/app/_services/maproute.service';
import { BulkorderServiceProxy, LocalBookingServiceProxy, RiderServiceProxy, RouteRateServiceProxy } from 'src/app/_services/service-proxies';
import { StoreService } from 'src/app/_services/store.service';
import {customConfig} from "../../custumConfig";
import { Base64 } from '@ionic-native/base64/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File, IWriteOptions, FileEntry, } from '@ionic-native/file/ngx';
class LocalBookingCost{

  bookingRate: LocalRouteRate
  booking: LocalBooking
  
  constructor(
    booking, bookingRate,){
    this.booking = booking
    this.bookingRate = bookingRate
  }

  getInsuranceCost(){
    const cost = (this.booking.isInsured ? 0.01 : 0) * this.booking.packageValue
    return cost > 0 ? cost : 0
  }
  getTotalCost(){
    const total = this.getInsuranceCost() + this.getExtraWeightCost() + this.getDeliveryCost()
    return total
  }
  getExtraWeightCost(){
    const cost = (this.booking.estimatedPackageWeight - 2) * this.bookingRate.chargeOnExtra
    return cost > 0 ? cost : 0
  }
  getDeliveryCost(){
    const cost = this.booking.numberOfPackages * this.bookingRate.generalRate
    return cost > 0 ? cost : 0
  }
}
@Component({
  selector: 'app-review-booking',
  templateUrl: './review-booking.page.html',
  styleUrls: ['./review-booking.page.scss'],
})
export class ReviewBookingPage implements OnInit {
  bookings: LocalBooking[] = [];
  // booking: LocalBooking = new LocalBooking();
  localBookingCosts: LocalBookingCost[] = []
  get booking(){
    if(this.localBookingCosts.length > 0){
      return this.localBookingCosts[this.selectedBookingIndex].booking
    } else {
      return new LocalBooking()
    }
  }
  get bookingCost(){
    if(this.localBookingCosts.length > 0){
      return this.localBookingCosts[this.selectedBookingIndex]
    } else {
      return new LocalBookingCost(new LocalBooking(), new LocalRouteRate())
    }
  }
  bookingRates = []
  selectedBookingIndex = 0;
  totalPayment = 0;
  customerType = 0;
  markOrderAsRecieved = new MarkOrderAsRecieved().clone();
  public captureDataUrl: any;
  constructor(
    private maproute: MaprouteService,
    private store: StoreService,
    private bookingService: LocalBookingServiceProxy,
    private bulkService: BulkorderServiceProxy,
    private localRouteRateService: RouteRateServiceProxy,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router,
    private authService: AuthenticationService,
    private base64: Base64,
    private camera: Camera,
    private loadspinner: LoadingController,
    private toastCtrl: ToastController,
    private file: File,
    private AuthenService: AuthenticationService,
    private orderService: RiderServiceProxy
  ) { }

  async ngOnInit() {
    this.customerType = this.authService.globalUserType.value
    this.bookings = await this.store.getBookings()
    // this.booking = this.bookings[0]
    // this.maproute.addressEnd = this.booking.deliveryAddress;
    // this.maproute.addressStart = this.booking.pickUpAddress;
    this.localBookingCosts = this.bookings.map(booking => new LocalBookingCost(booking, new LocalRouteRate()))
    this.bookings.forEach((booking, index) => {
      this.localRouteRateService.delivery_type(booking.pickupLocationId, booking.deliveryLocationId, booking.deliveryTypeId, booking.localBookingCategoryId).subscribe(response => {
        this.localBookingCosts[index] = new LocalBookingCost(booking, response.localRouteRate)
      })
    })
    this.maproute.addressEnd = this.booking.deliveryAddress;
    this.maproute.addressStart = this.booking.pickUpAddress;
  }

  async SubmitBookings(){
    const loading = await this.loadingController.create({
      message: "please wait...",
      translucent: true,
      spinner: "bubbles",
    })
    loading.present()
    let subject: Observable<any>;
    // const bookings = this.bookings.map(booking => booking.clone())
    const bookings = this.bookings
    if(bookings.length == 1){
      subject = this.bookingService.createorder(bookings[0])
    } else {
      subject = this.bulkService.createBulkOrder(bookings)
    }
    subject.subscribe(async(data) => {
      loading.dismiss()
      if(data.code == '000'){
        this.loadingController.dismiss()
        const toast = await this.toastController.create({
          message: 'Booking created successfully',
          duration: 2000
        });
        toast.present();
        this.router.navigate(['/orders'])
      } else {
        const toast = await this.toastController.create({
          message: data.message,
          duration: 2000
        });
        toast.present();
      }
    })
    // const promises = this.bookings.map(booking => {
    //   this.bookingService.createorder(booking).toPromise()
    // })
    // Promise.all(promises).then(data => {
    //   // this.toastController.create()
    // })
  }

  showNextBooking(){
    this.selectedBookingIndex += 1
    if(this.selectedBookingIndex >= this.bookings.length){
      this.selectedBookingIndex = 0
    }
    this.maproute.addressEnd = this.booking.deliveryAddress;
    this.maproute.addressStart = this.booking.pickUpAddress;
  }

  showPrevBooking(){
    this.selectedBookingIndex -= 1
    if(this.selectedBookingIndex < 0){
      this.selectedBookingIndex = this.bookings.length - 1
    }
    this.maproute.addressEnd = this.booking.deliveryAddress;
    this.maproute.addressStart = this.booking.pickUpAddress;
  }

  gotocamera(){     
      const cameraOptions: CameraOptions = {
        quality: 10,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
      };
      this.camera.getPicture(cameraOptions).then((imageData) => {
        this.base64.encodeFile(imageData).then((base64File: string) => {
          this.file.resolveLocalFilesystemUrl(imageData).then((entry: FileEntry) => {
            entry.file(file => {
              let fileType   = file.name.substring(file.name.lastIndexOf(".") + 1);
              console.log(base64File)
              this.markOrderAsRecieved.base64File = base64File.split(",")[1];
              this.markOrderAsRecieved.orderId = this.booking.id;
              this.markOrderAsRecieved.fileExtension = "."+ fileType;
              this.markOrderAsRecieved.fileName = file.name;
              this.markOrderAsRecieved.fileSize = file.size
               this.readFile(this.markOrderAsRecieved);  
            });
          });
        });          
      })
  
 
  }
  async readFile(payloadData) {
    let loading = await this.loadspinner.create({
      message: "please wait...",
      translucent: true,
      spinner: "bubbles",
    });
    await loading.present();
    this.orderService.markorderasreceived(payloadData).subscribe(async dataRes => {   
      console.log(dataRes)  
      if(dataRes.code == '000'){        
        const toast = await this.toastCtrl.create({
          duration: 3000,
          message: dataRes.message,
          color: "success"
        });
        toast.present();
        this.booking.bookingStatusId = 2;
      }else{
     
        const toast = await this.toastCtrl.create({
          duration: 3000,
          message: dataRes.message,
          color: "danger"
        });
        toast.present();
        if(dataRes.message == "Unauthorized"){
          this.AuthenService.clearusers();
         this.router.navigate(['preferedaction']);
        
        }
      }
    
     loading.dismiss()
    },async error =>{
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: 'Oops! something went wrong',
        color: "danger"
      });
      toast.present();
      loading.dismiss()
    });
  
  }
}
