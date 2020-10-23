import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import { NavController} from '@ionic/angular';
import { local_deliveryModel, pickup_detailsModel, package_detailsModel, LocaldeliveryButton } from '../../../_models/local_delivery'


@Component({
  selector: 'app-singleorder',
  templateUrl: './singleorder.page.html',
  styleUrls: ['./singleorder.page.scss'],
})
export class SingleorderPage implements OnInit {

  constructor(private router: Router,
    private navCtrl: NavController,
    private activatedroute: ActivatedRoute) { }

  ngOnInit() {
  }

  package_detailsForm:FormGroup;
  pickup_detailsForm: FormGroup; 
  delivery_detailsForm:FormGroup;
  
  local_delivery : local_deliveryModel ={};
  pickup_details : pickup_detailsModel = {};
  package_details : package_detailsModel ={};

  localoptions : LocaldeliveryButton = {};

  checkedIdx= true;
  disVal = true;
  // options = [
  //   'Yes',
  //   'No'
  // ];

  public myform = [
    { val: 'Yes', isChecked: true },
    { val: 'No', isChecked: false }
  ];

  //changeValue

  yesfn(event){
    if(event.detail.checked) this.checkedIdx = true;
  }

  nofn(event){
    if(event.detail.checked) this.checkedIdx = false;
   }

  pickup:boolean = false;
  delivery:boolean = false;
  package:boolean = false;
  activetab:string = "";
  goback(){
    this.navCtrl.back();
  }

  myfunction($val){
    this.activetab = $val;
  }

}
