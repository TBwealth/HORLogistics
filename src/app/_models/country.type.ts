import { Country,Currency,Language,Translations,RegionalBloc} from '../_models/country.model';

export class ICountry implements Country {
    name: string;
  callingCodes: any;
  alpha2Code: String;
  flag: string;
 
  
    constructor(country: Country) {
      this.name = country.name;
      this.flag = country.flag;
      this.alpha2Code = country.alpha2Code;
      this.callingCodes = country.callingCodes;      
    }

    getCountryFlag(){
      return this.flag;
    }
  }
