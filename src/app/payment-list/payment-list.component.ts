import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms/src/model';
import { Billing } from './../Billing';
import { ApiService} from './../api.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Location} from '@angular/common';
declare let paypal: any;

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  address: any = {};
  firstName:any={};
  lastName: any = {};
  sAddress: any = {};
  city: any = {};
  state: any = {};
  country:any={};
  zipcode:any ={};
  phone: any = {};
  orderFiles: any = {};
  order_tot_duration: any = {};
  order_tot_cost: any = {};
  currentStatus: number;
   finalAmount: number = 1;
   billing: any = {};
   currentUser:any = {};

    //paypal
    addScript: boolean = false;
    paypalLoad: boolean = true;

    billingForm: FormGroup; 

  readonly STATUS_INITIAL = 0;
  readonly STATUS_SAVING = 1;
  readonly STATUS_SUCCESS = 2;
  readonly STATUS_FAILED = 3;

	session_id: string;

  constructor(
    private fb:FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute, 
    private ApiService: ApiService,
    private _flashMessagesService: 
    FlashMessagesService, 
    private _location: Location) {
    this.reset(); // set initial state
  }


  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
      production: '<your-production-key-here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'INR' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
      })
    }
  };

  ngOnInit() {
    this.getOrderList();
    
    if (!this.addScript) {      
      this.addPaypalScript().then(() => {       
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
   
  }

   //getOrderList
   getOrderList(){
	  this.session_id = this.ApiService.getLocalSession('current_session_id');
	  
	  console.log('test-->'+this.session_id);
	  
    this.ApiService.getOrderList(JSON.parse(this.ApiService.getLocalSession('currentUser')),this.session_id)
    .subscribe(
    data => {
      	  
	  this.address  = data['address'];
	  this.firstName = this.address['first_name'];
	  this.lastName = this.address['last_name'];
	  this.sAddress = this.address['street_address'];
	  this.city = this.address['city'];
	  this.state = this.address['state'];
	  this.country = this.address['country'];
	  this.zipcode = this.address['zip'];
	  this.phone = this.address['phone'];
	  //console.log('tett'+data['files']);
     this.orderFiles = data['files'];
      this.order_tot_duration = data['tot_duration'];
      this.order_tot_cost     = data['tot_cost'];
      /*this.address  = data['address'];
      //this.billing.sub_total = this.order_tot_cost;
//this.billingForm.controls['sub_total'].setValue(data['tot_cost']);
      this.billingForm.patchValue({sub_total: this.order_tot_cost, tax_amt:'2',
       session_id: data['session_id'],
       first_name:  this.address['first_name'],
        last_name: this.address['last_name'],
        street_address: this.address['street_address'],
        city:this.address['city'],
        state: this.address['state'],
        country: this.address['country'],
        zip:this.address['zip'],
        phone: this.address['phone'],
        payment_method: this.address['payment_method']
       }); 
      /*for (let entry of data['files']) {
        /*this.uploadedFiles.push({'upload_name': entry['upload_name'],
        'id': entry['id'],
        'cost' : this.cost,
        'duration' : 1 });*/
        //this.uploadedFiles.push({'cost' : this.cost});
        //this.uploadedFiles = entry;*/
    //}
    },
    error => {
      this._flashMessagesService.show('Error in the Data/Server', { cssClass: 'alert-danger' });
    });
  } 

  public onFormSubmitPay() {
      
      this.session_id = this.ApiService.getLocalSession('current_session_id');
      this.currentUser = this.ApiService.getLocalSession('currentUser')
        /* Any API call logic via services goes here */
        this.ApiService.saveOrderData(JSON.parse(this.ApiService.getLocalSession('currentUser')),this.session_id)
        .subscribe(
        data => {
          console.log(data);
          console.log(data['status']);
          if (data['status'] == 1) {
            
            //this.billingForm.patchValue({purchase_order_id: data['purchase_order_id']}); 
            //WRITE CODE FOR PAYMENT GETWAY
            this._flashMessagesService.show(data['message'], { cssClass: 'alert-success' }); 
            this.ApiService.setLocalSession(this.guid(), 'current_session_id');         
            this.router.navigate(['user-dashboard']);
           // this.router.navigate(['payment-list']);
            
          } else {
            this._flashMessagesService.show(data['message'], { cssClass: 'alert-danger' });
          }
        },
        error => {
          this._flashMessagesService.show('Error in the Data/Server', { cssClass: 'alert-danger' });
        });
  }

  reset() {
    this.currentStatus = this.STATUS_INITIAL;
   }

   addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

  guid() {

    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() +this.s4();
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

}
