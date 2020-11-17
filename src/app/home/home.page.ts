import { Component, OnInit,ViewChild,ElementRef,AfterViewInit } from '@angular/core';
import { Geolocation,Geoposition } from '@ionic-native/geolocation/ngx';
import {Platform, NavController, AlertController,MenuController, PopoverController, LoadingController, ToastController } from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import {  VerifiedPhoneUpdate,StatusResource, LoginResource, Dispatcher,UpdateStatus } from "../_models/service-models";
import {PrimarylocationComponent} from './primarylocation/primarylocation.component';
import { RiderServiceProxy } from '../_services/service-proxies';
import {customConfig} from "../custumConfig";
declare var google;
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('searchbar', {read: ElementRef,static:true}) public searchbar: ElementRef;
  @ViewChild('searbarContainer', {read: ElementRef,static:true}) public searbarContainer: ElementRef;
  Urlbase = customConfig.baseUrl;
  map: any;
marker: any;
drawingManager:any;
completeShape:any;
savedCircle:any;
Lgpslatlng:any;
usersdata = new LoginResource().clone();
userRole = "";
loading: any = "";
dispatcher = new Dispatcher().clone();
riderStatus: any = '';
UpdateStatus = new UpdateStatus().clone();
  constructor(
    public platform:Platform, public navCtrl: NavController, public alertCtrl: AlertController,
    public geolocation: Geolocation, public activatedroute: ActivatedRoute,
    private menu: MenuController,
    private AuthenService: AuthenticationService,
    private router: Router,
    public popoverController: PopoverController,
    private loadspinner: LoadingController,
    private riderService: RiderServiceProxy,
    private toastCtrl: ToastController

  ) 
  { 
    this.platform.ready().then(async()=>{

      var mapOptions = {
        mapTypeId: 'roadmap',
        center: {lat: 9.077751, lng: 8.6774567},
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        zoom: 2
      }
      this.map = new google.maps.Map(document.getElementById("map"),mapOptions);
      this.GetLocation(); 
      

      var searchBox = new google.maps.places.SearchBox(this.searchbar.nativeElement);
      
      this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.searbarContainer.nativeElement);
      var ref = this;
      this.map.addListener('bounds_changed', function() {
        searchBox.setBounds(ref.map.getBounds());
      });
      var markers = [];
// Listen for the event fired when the user selects a prediction and retrieve
// more details for that place.
searchBox.addListener('places_changed', function() {
var places = searchBox.getPlaces();

if (places.length == 0) {
return;
}

// Clear out the old markers.
markers.forEach(function(marker) {
marker.setMap(null);
});
markers = [];

// For each place, get the icon, name and location.
var bounds = new google.maps.LatLngBounds();
places.forEach(function(place) {
if (!place.geometry) {
  console.log("Returned place contains no geometry");
  return;
}

var icon = {
  url: place.icon,
  size: new google.maps.Size(71, 71),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(17, 34),
  scaledSize: new google.maps.Size(25, 25)
};

// Create a marker for each place.
markers.push(new google.maps.Marker({
  map: ref.map,
  icon: icon,
  title: place.name,
  position: place.geometry.location
}));

if (place.geometry.viewport) {
  // Only geocodes have viewport.
  bounds.union(place.geometry.viewport);
} else {
  bounds.extend(place.geometry.location);
}
});
ref.map.fitBounds(bounds);
});
     

   
    })
  }
 
  async ionViewWillEnter(){
    this.loading = await this.loadspinner.create({
      message: "please wait...",
      translucent: true,
      spinner: "bubbles",
    });
    await this.loading.present();
    setTimeout(async() => {  
        this.AuthenService.users.length
        if(this.AuthenService.users.length > 0){
          this.usersdata = this.AuthenService.users[0];
          this.userRole = this.usersdata.role[0].name;
          console.log(this.userRole)
          if(!this.usersdata.isProfileComplete){
            const toast = await this.toastCtrl.create({
              duration: 3000,
              message: 'Please complete your profile to gain full access to the Application',
              color: "danger"
            });
            toast.present();
            this.router.navigate(['profilepage']);
          }else{
            if(this.userRole != 'Rider'){
              if(!this.usersdata.customer.closestBustopId){
                const popover = await this.popoverController.create({
                  component: PrimarylocationComponent,
                  cssClass: 'my-popover-class',
                  backdropDismiss: false,
                  // event: ev,
                  //translucent: true
                });
                return await popover.present();
              }
            }
           
          }
          if(this.userRole == 'Rider'){
            this.dispatcher = this.usersdata.dispatcher;
            this.riderStatus = this.dispatcher.dispatcherStatusesId;
          }
        }
  
      this.loading.dismiss()
    }, 3000); 
  }
    

  gotoprofile(){
    this.router.navigate(['profilepage']);
  }
  openMenu(){
this.menu.open();
  }
  filtersearch(event){
    var searchinput = event.srcElement.value
    var displaySuggestions = function(predictions, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        alert(status);
        return;
      }
      predictions.forEach(function(prediction) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(prediction.description));
        document.getElementById('results').appendChild(li);
      });
            
    }
    var service = new google.maps.places.AutocompleteService();
    service.getQueryPredictions({ input: searchinput }, displaySuggestions);
  }

  GetLocation(){
    var ref = this;
    let watch = this.geolocation.watchPosition({enableHighAccuracy:true});
    watch.subscribe((position) =>{
      if ((position as Geoposition).coords != undefined) {
        var geoposition = (position as Geoposition);
        var gps  = new google.maps.LatLng
        (geoposition.coords.latitude,
          geoposition.coords.longitude);
        ref.Lgpslatlng = gps;
       // console.log(gps);
        if(ref.marker == null){
          ref.marker = new google.maps.Marker({
            position: gps,
            map: ref.map,
            title: 'My Position'
          })
          ref.map.setZoom(17);
        }else{
          ref.marker.setPosition(gps);
        }
        ref.map.panTo(gps);
      } else { 
        var positionError = (position as PositionError);
        console.log('Error ' + positionError.code + ': ' + positionError.message);
      }
    
    }) 
   
  }
toggledriverStatus(){
var newStatus = this.riderStatus == 1?2:1;
this.UpdateStatus.dispatcherId = this.dispatcher.id;
this.UpdateStatus.statusId = newStatus;
this.riderService.changedispatcherstatus(this.UpdateStatus).subscribe(async data=>{
if(data.code == "000"){
  this.AuthenService.addUser(this.usersdata);
  this.riderStatus = newStatus;
  const toast = await this.toastCtrl.create({
    duration: 3000,
    message: data.message,
    color: "success"
  });
  toast.present();
}else{
  const toast = await this.toastCtrl.create({
    duration: 3000,
    message: data.message,
    color: "danger"
  });
  toast.present();
  if(data.code == "004"){
this.router.navigate(['preferedaction']);
  }
}
})

}
  ngOnInit() {
  }

}
