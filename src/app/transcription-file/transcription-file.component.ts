import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Billing } from './../Billing';
import { FormArray } from '@angular/forms/src/model';
import { ApiService} from './../api.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Location} from '@angular/common';
declare let paypal: any;
@Component({
  selector: 'app-transcription-file',
  templateUrl: './transcription-file.component.html',
  styleUrls: ['./transcription-file.component.css']
})
export class TranscriptionFileComponent implements OnInit {

  step1: boolean;
  step2: boolean;
  step3: boolean;
  uploadedFiles: any = {};
  orderFiles: any = {};
  uploadError;
  currentStatus: number;
  uploadFieldName = 'photos';
  imgid: number = 4;
  services: any = {};
  session_id: string;
  cost: number;
  currentUser: boolean;
  sid: number;
  sname:string;
  tot_duration : number;
  tot_cost: number;
  order_tot_duration : number;
  order_tot_cost: number;
  billing: any = {};
  address: any = {};

  readonly STATUS_INITIAL = 0;
  readonly STATUS_SAVING = 1;
  readonly STATUS_SUCCESS = 2;
  readonly STATUS_FAILED = 3;
  

  billingForm: FormGroup; 
  private user:Billing;

  constructor(private _svc: FileUploadService,private fb:FormBuilder, private router: Router, private route: ActivatedRoute, private ApiService: ApiService,
    private _flashMessagesService: FlashMessagesService, private _location: Location) {
    this.reset(); // set initial state
  }
  
  //paypal
  addScript: boolean = false;
  paypalLoad: boolean = true;
  
  finalAmount: number = 1;
 
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
  //paypal

  ngOnInit() {
    

    this.route.params.subscribe(params => {
      this.sid = params.sid;
      this.sname = params.sname;

    });

    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
    this.cost = 0;
    if(this.ApiService.getLocalSession('currentUser') === null){
        this.currentUser = true;
    }else{
      this.currentUser = false;
    }
    if (this.ApiService.getLocalSession('current_session_id') === null) {
      this.ApiService.setLocalSession(this.guid(), 'current_session_id');
    }
    this.getService();
    this.getFileList();
  
    //CREATING FOR BILLING FORM

    this.billingForm  = this.fb.group({     
      phone: ['',[Validators.required]],
      first_name: ['',[Validators.required]],
      last_name: ['', [Validators.required]],
      street_address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      sub_total: [''], 
      shipping_address_id: [''],
      tax_amt:[''],
      purchase_order_id:[''],      
      payment_method: [''],
      session_id:[''],
          
     })
    
     


  }
  
  
  // VALIDATION FOR BILLING DETAILS
  get street_address() { return this.billingForm.get('street_address'); }  
  get phone() { return this.billingForm.get('phone'); }
  get first_name() { return this.billingForm.get('first_name'); }
  get last_name() { return this.billingForm.get('last_name'); }
  get city() { return this.billingForm.get('city'); }
  get zip() { return this.billingForm.get('zip'); }
  get state() { return this.billingForm.get('state'); }
  get country() { return this.billingForm.get('country'); }
  
 

  // FORM SUBMIT FOR BILLING DETAILS
  public onFormSubmitBilling() {
    if(this.billingForm.valid) {  
      
      

      
        this.billing = this.billingForm.value;
        console.log(this.billing);
        /* Any API call logic via services goes here */
        this.ApiService.billing(this.billing, JSON.parse(this.ApiService.getLocalSession('currentUser')))// check
        .subscribe(
        data => {
          console.log(data);
          if (data['status'] == 1) {
            
            this.billingForm.patchValue({purchase_order_id: data['purchase_order_id']}); 
            //WRITE CODE FOR PAYMENT GETWAY
            this._flashMessagesService.show(data['message'], { cssClass: 'alert-success' }); 
            this.ApiService.setLocalSession(this.guid(), 'current_session_id');         
            this.router.navigate(['user-dashboard']);
            
          } else {
            this._flashMessagesService.show(data['message'], { cssClass: 'alert-danger' });
          }
        },
        error => {
          this._flashMessagesService.show('Error in the Data/Server', { cssClass: 'alert-danger' });
        });
    }
  }
  //END FORM SUBMIT FOR BILLING DETAILS
  getFileList(){
    this.ApiService.getFilesList(this.ApiService.getLocalSession('current_session_id'))
    .subscribe(
    data => {
      console.log(data['files']);
      this.uploadedFiles = data['files'];
      this.tot_duration = data['tot_duration'];
      this.tot_cost     = data['tot_cost'];
      /*for (let entry of data['files']) {
        /*this.uploadedFiles.push({'upload_name': entry['upload_name'],
        'id': entry['id'],
        'cost' : this.cost,
        'duration' : 1 });*/
        //this.uploadedFiles.push({'cost' : this.cost});
        //this.uploadedFiles = entry;
    //}
    },
    error => {
      this._flashMessagesService.show('Error in the Data/Server', { cssClass: 'alert-danger' });
    });
  }
  //getOrderList
  getOrderList(){
    this.ApiService.getOrderList(JSON.parse(this.ApiService.getLocalSession('currentUser')))
    .subscribe(
    data => {
      console.log(data['files']);
      this.orderFiles = data['files'];
      this.order_tot_duration = data['tot_duration'];
      this.order_tot_cost     = data['tot_cost'];
      this.address  = data['address'];
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
        //this.uploadedFiles = entry;
    //}
    },
    error => {
      this._flashMessagesService.show('Error in the Data/Server', { cssClass: 'alert-danger' });
    });
  }
  getService(){
    this.ApiService.getServiceList()
    .subscribe(
    data => {
      //console.log(data);
      this.services = data;
    },
    error => {
      this._flashMessagesService.show('Error in the Data/Server', { cssClass: 'alert-danger' });
    });
  }
  fileDelete(id, index){
    this.ApiService.deleteFilesList(id)
    .subscribe(
    data => {
      if(data['status'] == 1){       
        this._flashMessagesService.show(data['message'], { cssClass: 'alert-success' });  
        this.uploadedFiles.splice(index, 1);
        this.getFileList();
      }else{
        this._flashMessagesService.show('Error in the Data/Server', { cssClass: 'alert-danger' });
      }
    },
    error => {
      this._flashMessagesService.show('Error in the Data/Server', { cssClass: 'alert-danger' });
    });
  }
  guid() {

    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() +this.s4();
  }
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  SignIn(){
    this.step1 = false;
    this.step2 = true;
    this.step3 = false;
  }
  AddFiles(){
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
  }
  BillingDetails(){
    this.step1 = false;
    this.step2 = false;
    this.step3 = true;
    if (!this.addScript) {      
      this.addPaypalScript().then(() => {       
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
    this.getOrderList();
  }
  // file upload start
  
  filesChange(fieldName: string, fileList: FileList) {
    // handle file changes
    const formData = new FormData();
    var supportedFomats = ["AIF", "AIFF", "AMR", "AVI", "DSS", "DVD", "DVF", "FLV", "M4A", "MOV", "MP2", "MP3", "MP4", "MPEG", "MPG", "MSV", "QTFF", "RM", "WAV", "WMV", "VOB", "WMA", "DOC", "TXT", "PDF", "DOCX"];
    let typeError = true;
    //console.log(fileList);
    //console.log(fieldName);
    this.session_id = this.ApiService.getLocalSession('current_session_id')
    if (!fileList.length) return;
    
    // append the files to FormData
    Array
      .from(Array(fileList.length).keys())
      .map(x => {
        //console.log(fileList[x].type);
        var ext = fileList[x].name.split('.').pop();
        if(supportedFomats.indexOf(ext.toUpperCase()) > -1){
        formData.append(fieldName, fileList[x], fileList[x].name);
        }else{
                        
            typeError = false;
        }
      });
    console.log(typeError);
    // save it
    if(typeError == true)
        this.save(formData, this.session_id, this.sid);
    else
        this._flashMessagesService.show('Uploads should be PDF & Audio/Video Files', { cssClass: 'alert-danger' });
  }

  reset() {
    this.currentStatus = this.STATUS_INITIAL;
    this.uploadedFiles = [];
    this.uploadError = null;
  }

  save(formData: FormData, session_id, service_id) {
    // upload data to the server
    this.currentStatus = this.STATUS_SAVING;
    // console.log(formData);
    
    this._svc.upload(formData, session_id, service_id)
      .take(1)
      .delay(1500) // DEV ONLY: delay 1.5s to see the changes
      .subscribe(x => {
        if(x['status'] == 'success'){       
          this._flashMessagesService.show(x['message'], { cssClass: 'alert-success' });  
          this.getService();
          this.getFileList();
        }else{
          this._flashMessagesService.show('Error in the Data/Server', { cssClass: 'alert-danger' });
        }
        //console.log('RES: '+x['id']);
      // console.log(x['files'].length);
       
       /* refer for (let entry of x['files']) {
        this.uploadedFiles.push(entry);
       }*/
       /*for (let entry of x['files']) {
        this.uploadedFiles.push({'upload_name': entry['upload_name'],
        'id': entry['id'],
        'cost' : this.cost,
        'duration' : 1 });
       
       }
        console.log(this.uploadedFiles);*/
        this.currentStatus = this.STATUS_INITIAL;

      }, err => {
        this.uploadError = err;
        this.currentStatus = this.STATUS_FAILED;
      })
}

calculateCost(e, options, id, service_id){
 
 this.ApiService.updateFilesList(e, options, id, service_id)
 .subscribe(
 data => {
   if(data['status'] == 1){       
     this._flashMessagesService.show(data['message'], { cssClass: 'alert-success' });  
     this.getFileList();
   }else{
     this._flashMessagesService.show('Error in the Data/Server', { cssClass: 'alert-danger' });
   }
 },
 error => {
   this._flashMessagesService.show('Error in the Data/Server', { cssClass: 'alert-danger' });
 });
}
checkout(fileList){
  if(this.ApiService.getLocalSession('currentUser') === null){
    this._flashMessagesService.show('Login first and then checkout', { cssClass: 'alert-danger' });
    this.router.navigate(['login']);
  }else{
    console.log(fileList);
     
    this.ApiService.saveOrderList(fileList,JSON.parse(this.ApiService.getLocalSession('currentUser')))
    .subscribe(
    data => {
      if(data['status'] == 1){       
        this._flashMessagesService.show(data['message'], { cssClass: 'alert-success' });  
        this.getFileList();
        this.BillingDetails();
      }else{
        this._flashMessagesService.show('Error in the Data/Server', { cssClass: 'alert-danger' });
      }
    },
    error => {
      this._flashMessagesService.show('Error in the Data/Server', { cssClass: 'alert-danger' });
    });
 }
}
loginReg(){
  if(this.ApiService.getLocalSession('currentUser') === null){
    this.router.navigate(['login']);
  }else{
    this.BillingDetails();
  }    
  
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
  // End file upload

}
