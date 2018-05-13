import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './../User';
import { FormArray } from '@angular/forms/src/model';
import { ApiService} from './../api.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  
  token: string;
  signupForm: FormGroup; 
  private user:User;
  constructor(private fb:FormBuilder, private route: ActivatedRoute, private ApiService: ApiService,
    private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.token = params.id;

    });

    this.signupForm  = this.fb.group({
      password: ['',[Validators.required, Validators.minLength(8)]],
      confirmpassword: ['',[Validators.required, Validators.minLength(8)]],
          
          
  })

    console.log(this.token);
    this.ApiService.verifyToken(this.token)
      .subscribe(
      data => {
        console.log(data);
        this.user.id = data['id'];
      },
      error => {
        this._flashMessagesService.show('Error in the Data/Server', { cssClass: 'alert-danger' });
      });
  }
  get confirmpassword() { return this.signupForm.get('confirmpassword'); }  
  get password() { return this.signupForm.get('password'); }
  public onFormSubmit() {
    if(this.signupForm.valid) {
    this.ApiService.resetPassword(this.user)
      .subscribe(
      data => {
        if (data['status'] === 'success') {
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
