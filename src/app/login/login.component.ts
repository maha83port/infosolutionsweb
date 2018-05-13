import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './../User';
import { FormArray } from '@angular/forms/src/model';
import { ApiService} from './../api.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signupForm: FormGroup; 
  private user:User;
  login: boolean;
  logouts: boolean;
  constructor(private fb:FormBuilder, private _location: Location, private ApiService: ApiService, private router: Router, private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.signupForm  = this.fb.group({
      email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['',[Validators.required, Validators.minLength(8)]],
          
          
  })
  }

 get email() { return this.signupForm.get('email'); }
  
 get password() { return this.signupForm.get('password'); }

 public onFormSubmit() {
  if(this.signupForm.valid) {   
      this.user = this.signupForm.value;
      console.log(this.user);
      /* Any API call logic via services goes here */
      this.ApiService.login(this.user)
      .subscribe(
      data => {
        console.log(data);
        if (data['status'] === 'success') {
          //delete data['status'];
          //delete data['message'];
          this.ApiService.setLocalSession(data, 'currentUser');
          this._flashMessagesService.show('Logged in Successfully', { cssClass: 'alert-success' });  
          this.login = false;
          this.logouts = true;         
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
