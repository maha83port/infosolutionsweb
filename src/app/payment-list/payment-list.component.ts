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
  couponcodeshow: boolean = false;
  coupon: any = {};
  mode: any = {};   
    //paypal
    addScript: boolean = false;
    pay: any = {};
    paypalLoad: boolean;

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
    this.paypalLoad = true;
  }


  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'ATMHCin6K_odomNsAt9aF4T9GWQY7Ogx-G1WbCa9moVEsNALj5fVCN7GW8X5M8s2qj5k99OVZuqCaukS',
      production: '<your-production-key-here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.order_tot_cost, currency: 'USD' },
              custom: '0011' }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
        data => {
          console.log(data);
          
        }
        console.log(data);
        this.mode.token = data.paymentID;
        this.mode.payment_mode = 'paypal';
        this.savePaymentFun(this.mode);              
               
      });
    },
    onCancel: function(data) {
      console.log('The payment was cancelled!');
      this._flashMessagesService.show('The payment was cancelled!', { cssClass: 'alert-danger' });     
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

    this.billingForm  = this.fb.group({     
      coupon_code: ['',[Validators.required]]     
          
     });
    
  }
  get coupon_code() { return this.billingForm.get('coupon_code'); }  
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
    this.orderFiles = data;
    this.order_tot_duration = data['tot_duration'];
    this.order_tot_cost     = data['tot_cost'];
      
    },
    error => {
      this._flashMessagesService.show('Error in the Data/Server', { cssClass: 'alert-danger' });
    });
  } 
  public savePaymentFun(mode){
    this.session_id = this.ApiService.getLocalSession('current_session_id');
    this.currentUser = this.ApiService.getLocalSession('currentUser')
      /* Any API call logic via services goes here */
      this.ApiService.saveOrderData(JSON.parse(this.ApiService.getLocalSession('currentUser')),this.session_id, mode)
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
  public onFormSubmitPay() {
      
    
    if(!this.couponcodeshow){
        this.couponcodeshow = true;
        return;
     }else{
      if(this.billingForm.valid) {    
        
          this.billing = this.billingForm.value;
          console.log(this.billing);
          this.ApiService.checkCouponCode(JSON.parse(this.ApiService.getLocalSession('currentUser')),this.session_id, this.billing)
          .subscribe(
          data => {      	  
          console.log(data);
          if(data['status'] == 'success'){
            this.mode.token = data['coupon_no'];
            this.mode.payment_mode = 'free';
            this.savePaymentFun(this.mode);
          }else{
            this._flashMessagesService.show('Coupon code does not exist', { cssClass: 'alert-danger' });
          }
            
          },
          error => {
            this._flashMessagesService.show('Error in the Data/Server', { cssClass: 'alert-danger' });
          });
      }
     }
     
      
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
