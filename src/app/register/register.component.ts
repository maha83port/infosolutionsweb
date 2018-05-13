import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './../User';
import { FormArray } from '@angular/forms/src/model';
import { ApiService} from './../api.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Location} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup; 
  private user:User;
  constructor(private fb:FormBuilder, private _location: Location, private ApiService: ApiService, private router: Router, private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.registerForm  = this.fb.group({
      email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phone: ['',[Validators.required]],
      first_name: ['',[Validators.required]],
      last_name: ['', [Validators.required]],
          
          
  })
  }

 get email() { return this.registerForm.get('email'); }  
 get phone() { return this.registerForm.get('phone'); }
 get first_name() { return this.registerForm.get('first_name'); }
 get last_name() { return this.registerForm.get('last_name'); }

 public onFormSubmitRegister() {
  if(this.registerForm.valid) {   
      this.user = this.registerForm.value;
      console.log(this.user);
      /* Any API call logic via services goes here */
      this.ApiService.register(this.user)
      .subscribe(
      data => {
        console.log(data);
        if (data['status'] === 'success') {
          delete data['status'];
          delete data['message'];
          this.ApiService.setLocalSession(data, 'currentUser');
          this._flashMessagesService.show('Successfully Register, Please check your email account', { cssClass: 'alert-success' });          
          //this.router.navigate(['user-dashboard']);
          this._location.back();
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
