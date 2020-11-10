import { Component, OnInit,Input } from '@angular/core';
import { Geolocation,Geoposition } from '@ionic-native/geolocation/ngx';
import { AlertController, NavController, Platform, ToastController } from '@ionic/angular';
import {MaprouteService} from '../../_services/maproute.service';

declare var google;

@Component({
  selector: 'app-maproutecomponent',
  templateUrl: './maproutecomponent.component.html',
  styleUrls: ['./maproutecomponent.component.scss'],
})
export class MaproutecomponentComponent implements OnInit {
addressStart: any;
addressEnd: any;
  @Input() set location(val: Coordinates){
    if(val){
      // this.makeMarker(val, "", "")
      this.makeMarker( val,  null, "Start" );
      console.log('Location reached', val)
    }
  }
  map: any;
  marker: any;
  drawingManager:any;
  completeShape:any;
  savedCircle:any;
  Lgpslatlng:any;
    constructor(private navCtrl: NavController, 
      public platform:Platform, 
      public alertCtrl: AlertController,
      public geolocation: Geolocation,
      private maproute: MaprouteService,
      private toastCtrl: ToastController  ) { 

        this.platform.ready().then(()=>{
          const directionsService = new google.maps.DirectionsService();
          const directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
          var mapOptions = {
            mapTypeId: google.maps.MapTypeId.terrain,
            center: { lat: 9.077751, lng: 8.6774567},
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            zoomControl: false,
            draggableControl: false,
            zoom: 7,
           
          }
          this.map = new google.maps.Map(document.getElementById("map"),mapOptions);
          directionsRenderer.setMap(this.map);
          const geocoder = new google.maps.Geocoder();
          this.maproute.subject.subscribe(data => {
            this.calculateAndDisplayRoute(directionsService, directionsRenderer, this.map);
          })
         // this.geocodeAddress(geocoder, this.map);
        })
  
      }
      calculateAndDisplayRoute(directionsService, directionsRenderer,resultsMap) {
        directionsService.route(
          {
            origin: {
              query: this.maproute.addressStart,
              
            },
            destination: {
              query: this.maproute.addressEnd,
            },
            
            travelMode: google.maps.TravelMode.DRIVING,
            
          },
         async (response, status) => {
            if (status === "OK") {
              directionsRenderer.setDirections(response);
              var leg = response.routes[ 0 ].legs[ 0 ];
            this.makeMarker( leg.start_location, {
              url: 'http://localhost:8100/assets/images/start.png',
              scaledSize: new google.maps.Size( 11, 8 )
            }, "Start" );
            this.makeMarker( leg.end_location, {
              url: 'http://localhost:8100/assets/images/end.png',
              scaledSize: new google.maps.Size( 11, 8 )
            }, 'End' );
  
            } else {
              const toast = await this.toastCtrl.create({
                duration: 3000,
                message: "Directions request failed due to " + status,
                color: "danger"
              });
              toast.present();
            }
          }
        );
      }
  
      makeMarker( position, icon, title ) {
        console.log(position, this.map)
        new google.maps.Marker({
         position: position,
         map: this.map,
         icon: icon,
         title: title
        });
       }
  
      geocodeAddress(geocoder, resultsMap) {
        var flightPlanCoordinates = [];
        const address1 = "13, Church street, Makoko Lagos";
        const address2 = "7, Amore street, off Freedom way, Lekki, Lagos";
        geocoder.geocode({ address: address1 }, (results, status) => {
          if (status === "OK") {
            // var address1latitude = results[0].geometry.location.lat();
            // var address1longitude = results[0].geometry.location.lng(); 
          //  console.log({lat: address1latitude, lng: address1longitude});
            //flightPlanCoordinates.push({lat: address1latitude, lng: address1longitude})          
            // resultsMap.setCenter(results[0].geometry.location);
            new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location,
              icon: '../assets/images/female-avatar.png'
            });
  
            geocoder.geocode({ address: address2 }, (results, status) => {
              if (status === "OK") {
                // var address2latitude = results[0].geometry.location.lat();
                // var address2longitude = results[0].geometry.location.lng(); 
              //  console.log({lat: address2latitude, lng: address2longitude});
               // flightPlanCoordinates.push({lat: address2latitude, lng: address2longitude})
                //resultsMap.setCenter(results[0].geometry.location);
                new google.maps.Marker({
                  map: resultsMap,
                  position: results[0].geometry.location,
                  icon: '<ion-icon name="ellipse" style="color:#444F63;"></ion-icon>'
                });
                // console.log(flightPlanCoordinates);
                // const flightPath = new google.maps.Polyline({
                //   path: flightPlanCoordinates,
                //   geodesic: true,
                //   strokeColor: "#FF0000",
                //   strokeOpacity: 1.0,
                //   strokeWeight: 2,
                // });
                // flightPath.setMap(this.map);
              }        
            });
          }        
        });
       
       
  
      }

  ngOnInit() {}

}
