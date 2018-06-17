import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FreeQuote } from './../get-free-quote-form';
import { FormArray } from '@angular/forms/src/model';
import { ApiService} from './../api.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Location} from '@angular/common';

@Component({
  selector: 'app-get-free-quote',
  templateUrl: './get-free-quote.component.html',
  styleUrls: ['./get-free-quote.component.css']
})
export class GetFreeQuoteComponent implements OnInit {
  freeQuoteForm: FormGroup; 
  private FreeQuote:FreeQuote;
  constructor(private fb:FormBuilder, private _location: Location, private ApiService: ApiService, private router: Router, private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.freeQuoteForm  = this.fb.group({
      email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      full_name: ['',[Validators.required]],
      company: ['',[Validators.required]],
      phone_number: ['',[Validators.required]],
      volume: ['',[Validators.required]],
      frequency: ['',[Validators.required]],
      other_needs: [''],
            
          
  })
  }

  get email() { return this.freeQuoteForm.get('email'); }  
  get full_name() { return this.freeQuoteForm.get('full_name'); }
  get company() { return this.freeQuoteForm.get('company'); }
  get phone_number() { return this.freeQuoteForm.get('phone_number'); }
  get volume() { return this.freeQuoteForm.get('volume'); }
  get frequency() { return this.freeQuoteForm.get('frequency'); }
  get other_needs() { return this.freeQuoteForm.get('other_needs'); }


  public onFormSubmit() {
    if(this.freeQuoteForm.valid) {   
        this.FreeQuote = this.freeQuoteForm.value;
        console.log(this.FreeQuote);
        /* Any API call logic via services goes here */
        this.ApiService.saveFreeQuote(this.FreeQuote)
        .subscribe(
        data => {
          console.log(data);
          if (data['status'] === 'success') {  
            
            this._flashMessagesService.show('Logged in Successfully', { cssClass: 'alert-success' });                    
       
          } else {
            this._flashMessagesService.show(data['message'], { cssClass: 'alert-danger' });
          }
        },
        error => {
          this._flashMessagesService.show('Error in the Data/Server', { cssClass: 'alert-danger' });
        });
    }
  }

}
