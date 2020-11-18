import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

interface FAQ{
  question: string,
  answer: string
  show?: boolean
}
@Component({
  selector: 'app-helpcenter',
  templateUrl: './helpcenter.page.html',
  styleUrls: ['./helpcenter.page.scss'],
})
export class HelpcenterPage implements OnInit {

  faqs: FAQ[] = [{'question': ' How do I register on your website for international shipping',
  'answer': '\nClick on REGISTER on the homepage of our website, and you will be required to fill an online\nform. Click SUBMIT after providing the information required. Subsequently, when you visit our\nwebsite, click on LOGIN, put in your email and password, and click SUBMIT. Click the Navigation\nscreen on your dashboard, select Make an Order, select International and then click on Create.\nYou will be required to fill an online form, where you will provide booking details. After filling\nthe form, review the shipping cost summary before clicking SUBMIT.'},
 {'question': ' How do I get your UK and US warehouse address',
  'answer': '\nKindly follow the three (3) quick steps below.\n1. Log on to www.horlogistics com.ng and login to access your dashboard.\n2. On your Dashboard, select Make an Order.\nThen Local, International, and Checkout Assistance are displayed underneath.\n3. Select International, then click on Get UK and US address.\nThe address will appear on the webpage for use.'},
 {'question': ' I do not receive email updates from you. How do I enable it',
  'answer': '\nLog on to our website, on your navigation screen, scroll down, and select Notification settings.\nSelect Yes to Enable Newsletter, then click Update.'},
 {'question': ' Do you offer express shipping from the US',
  'answer': '\nNo, we do not. Our shipments from the US to Nigeria take a delivery timeline of 5-10 working\ndays.'},
 {'question': ' Are there items you do not ship from the UK or the US to Nigeria',
  'answer': '\nWe do not ship food items, especially perishables.'},
 {'question': ' What is the minimum weight you ship from the UK and the US to Nigeria',
  'answer': '\nThe minimum weights we ship from the UK and the US are 2kg and 2lb respectively.'},
 {'question': ' What is volume weight, and how does it affect my billing',
  'answer': '\nVolume weight refers to an estimated weight that is calculated from the length, width, and\nheight of a package. You will be billed at volume weight and actual weight. This means your bill\nwill include the actual weight of your package and the length, width, and height of the same\npackage.'},
 {'question': ' Is there are a maximum weight you ship',
  'answer': '\nThere is currently no maximum weight restriction. We only have a minimum weight restriction,\nwhich is 2kg or 2lb as the case may be.'},
 {'question': ' How should an item I want delivered to your warehouse be addressed',
  'answer': '\nThe item should be addressed in your full name, and make sure to always include C/O HOR\nLogistics on the package. For example, Ade Umar C/O HOR Logistics. Make sure that you input\nthe correct address, postal code, and phone number of our warehouse.'},
 {'question': ' How long does Lagos to Ibadan delivery take',
  'answer': '\nOur Lagos to and from Ibadan deliveries take a maximum of two working days.'},
 {'question': ' Do you do doorstep delivery',
  'answer': '\nYes, we do doorstep to doorstep deliveries both for Lagos to and from Abuja and Lagos to and\nfrom Ibadan.'},
 {'question': ' Do you have a WhatsApp number I could chat you up on',
  'answer': '\nWe presently do not have any WhatsApp number, but you could always reach us through our\nhelpdesk on +2348133827441,+2348124335474, or +2349037457470'},
 {'question': ' How can I become a partner',
  'answer': '\nWhen you are registering on our website, there is a section where you will be asked, Will you\nlike to register as a partner'},
 {'question': ' Are there limits to the weight of items I can deliver with cargo delivery',
  'answer': '*'},
 {'question': ' How can I book for your cargo delivery service',
  'answer': '\nTo book our Cargo delivery service, contact our help desk on\n+2348133827441,+2348124335474, or +2349037457470'},
 {'question': ' Do you do same-day delivery',
  'answer': '\nYes, we do. We do same day local deliveries within Lagos, Abuja, and Ibadan.'},
 {'question': ' Do you work during public holidays',
  'answer': '\nYes, we do. On any occasion where we do not, you will be notified through our various\ncommunication platforms.'},
 {'question': ' How long can I give a hold instruction for my packages in your warehouse',
  'answer': '\nYou can only give a hold instruction for one week. To request a hold of your item in our\nwarehouse, you can send us an email.'},
 {'question': ' I stay in Warri, but I want to ship in an item from the UK, but since you do not have a\nbranch in Warri, how can I go about it',
  'answer': '\nWe can ship your item to Lagos then, you can decide what logistics service you’ll want us to\nsend the item through to you in Warri, and we shall take it there. This attracts an extra cost.'},
 {'question': ' What time of the day can I reach your help desk',
  'answer': '\nYou can always reach our help desk between 8AM-6PMonMondays-Saturdays.'},
 {'question': ' Can I ship an item from the UK to Abuja',
  'answer': '\nYes, you can. The item will be received in our office in Lagos and thereafter, sent to you in\nAbuja.'},
 {'question': ' Do your warehouses in the UK accept packages on weekends',
  'answer': '\nOur warehouses in the UK and the US do not open on weekends.'},
 {'question': ' What time do your warehouses close',
  'answer': '\nOur UK warehouse opens by 9 AM and closes by 5 PM while our US warehouse opens by 11 AM\nand closes by 6 PM.'},
 {'question': ' When is the deadline for sending my packages to your warehouse if I want them to be\nshipped with the next available batch',
  'answer': '\nAll online orders to be delivered to our warehouse have to come in before Friday or at most by\nnoon on Friday as we ship every Friday. Any packages delivered to our warehouse after noon on\nFriday will be shipped out with the next week’s shipment.'},
 {'question': ' Do you do local deliveries on weekends',
  'answer': '\nWe deliver local orders on Saturdays, but we do not deliver orders on Sunday.'},
 {'question': ' How do I track my international orders when booked from your website',
  'answer': '\nYes, you can track your items as soon as we receive them in our warehouse. The tracking details\nwill be sent to you via email.'},
 {'question': ' How does your checkout assistance service work',
  'answer': '\nCheck out assistance is an initiative we came up with to help people that encounter issues with\npayment while shopping online on their favourite UK or US website. With our Checkout\nAssistance service, we can help you purchase items online from any US or UK website without\ndifficulty.'},
 {'question': ' Do you ship from other countries in Europe besides the UK',
  'answer': '\nFor now, the only country in Europe we ship from is The UK.'},
 {'question': ' If I book for your “rider for a day service,” how many deliveries am I guaranteed',
  'answer': '\nYou are guaranteed between 10-15 deliveries for the day within the city wherein you booked\nthe service.'},
 {'question': ' Is there a place I can go to see your price list for delivery to different locations',
  'answer': '\nYou can see the pricing list for all the services we offer, both local and international deliveries on\nour website. Click on Pricing on the home page of the website to see our pricing list.'},
 {'question': ' Do I have to pay a tax fee or any other fee after paying the handling fee and shipping fee per kg',
  'answer': '\nThe only fees you have to pay are the handling fee and the shipping fee by kg or lb as the case\nmay be.'},
 {'question': ' If I make a local delivery, what are the payment options available to me',
  'answer': '\nFor now, the only method of payment we accept is bank transfers.'},
 {'question': ' How long does Abuja to Lagos and Lagos to Abuja delivery take',
  'answer': '\nOur Lagos to Abuja Delivery service is available in two (2) packages.\n.\n*Standard Delivery (takes 2 days)\nNGN2,000 for packages weighing 0-2kg\n(additional NGN500 for every extra kg) .\n.\n*Express Delivery (next day delivery)\nNGN2,500 for packages weighing 0-2kg\n(additional NGN750 for every extra kg)\n.\n. *Express delivery should be booked before 10 am, and Standard delivery should be booked\nbefore 12 pm.'},
 {'question': ' If I try to contact your help desk for an urgent issue and the numbers do not go through,\nhow else can you be contacted',
  'answer': '\nYou can contact us on our website through our webchat, or you can send us a DM on Instagram.'},
 {'question': ' Are the bikes for fleet management insured',
  'answer': '\nYes, they are.'},
 {'question': ' Can I take my bike at the end of the fleet management contract',
  'answer': '\nNo, you cannot. At the end of the contract, the bike remains with us.'},
 {'question': ' How do I get my ROI for Fleet management',
  'answer': '\nThis depends on you. You can decide that you want to be paid either monthly, bi-annually, or\nannually.'},
 {'question': ' So, there are no more standard or express shipping options to the UK',
  'answer': '\nOur shipping to the UK is billed at £4.5 per kg (with a handling fee of NGN5,000) to be shipped\nwithin 3-5 working days.\n'}]


  constructor(private navCtrl: NavController, private router: Router) { }
  goback(){
    this.navCtrl.back();
  }
  gotochat(){
this.router.navigate(['chat'])
  }
  ngOnInit() {
  }

  toggle(faq: FAQ){
    faq.show = !faq.show
  }

}
