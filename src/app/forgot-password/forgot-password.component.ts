import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './../User';
import { FormArray } from '@angular/forms/src/model';
import { ApiService} from './../api.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  signupForm: FormGroup; 
  private user:User;
  login: boolean;
  logouts: boolean;
  constructor(private fb:FormBuilder, private ApiService: ApiService, private router: Router, private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.signupForm  = this.fb.group({
      email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
               
          
  })
  }

 get email() { return this.signupForm.get('email'); }
  
 

 public onFormSubmit() {
  if(this.signupForm.valid) {   
      this.user = this.signupForm.value;
      console.log(this.user);
      /* Any API call logic via services goes here */
      this.ApiService.forgotpassword(this.user)
      .subscribe(
      data => {
        console.log(data);
        if (data['status'] === 'success') {
          //delete data['status'];
          //delete data['message'];
         
          this._flashMessagesService.show(data['message'], { cssClass: 'alert-success' });  
          
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
