import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Countries, Country } from 'src/app/_models/country.model';
import { CountryserviceService } from 'src/app/_services/countryservice.service';
import libphonenumber from 'google-libphonenumber';

@Component({
  selector: 'app-phone-selector',
  templateUrl: './phone-selector.component.html',
  styleUrls: ['./phone-selector.component.scss'],
})
export class PhoneSelectorComponent implements OnInit {
  phoneNo = ''
  @Input() set value(val: string){
    this.phoneNo = val
  }
  @Output() valueChange = new EventEmitter<string>()
  alpha2Code = "NG";
  ICountrys: Country[] = [];
  selectedFlag: any;
  constructor(
    public Cservice: CountryserviceService,
  ) { }

  ngOnInit() {
    this.getcountry();
    this.getCountryFlag("NG", '')
  }

  openCountries() {
    setTimeout(() => {
      // this.ICountrys = this.Cservice.setItems(); 
      let radios = document.getElementsByClassName('alert-radio-label');
      for (let index = 0; index < radios.length; index++) {
        let element = radios[index];
        var elValue = element.innerHTML.valueOf();
        element.innerHTML = '<img class="country-image" style="width: 30px;height:16px;" src="' + this.ICountrys[index].flag + '" />';
        element.innerHTML = element.innerHTML.concat(' ' + elValue);
      }
    }, 1000);
  }

  getCountryFlag(countVal, panel) {
    this.selectedFlag = this.Cservice.getCountryFlag(countVal);
    this.alpha2Code = countVal;

  }
  getcountry() {
    this.ICountrys = this.Cservice.setItems();
    // console.log(this.ICountrys);
    this.alpha2Code = "NG";
  }
  countrySelected(event){
    console.log(event)
  }
  async validatePhone(pNumber: string) {
    // const pNumber = this.phoneNo
    console.log(pNumber)
    // console.log(event)
    var reg = new RegExp('^[+.0-9]+$');
    let pnumber = "";

    let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance(),
      PNF = libphonenumber.PhoneNumberFormat;
    if (pNumber !== "" && pNumber && reg.test(pNumber)) {

      const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
      let phoneNumber = "" + pNumber + "",

        region = this.alpha2Code,
        number = phoneUtil.parse(phoneNumber, region),
        isValidNumber = phoneUtil.isValidNumber(number);
      pnumber = phoneUtil.format(number, PNF.E164);
      this.valueChange.emit('+234' + pNumber)
    }

  }
}
