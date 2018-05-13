import { Component, OnInit } from '@angular/core';
import { ApiService} from './../api.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  purchaseList: any = {};

  constructor(private ApiService: ApiService,
    private _flashMessagesService: FlashMessagesService) { }
  
  ngOnInit() {

    this.ApiService.getUserPurchase(JSON.parse(this.ApiService.getLocalSession('currentUser')))
    .subscribe(
    data => {
     
      this.purchaseList = data;
     
      
    },
    error => {
      this._flashMessagesService.show('Error in the Data/Server', { cssClass: 'alert-danger' });
    });
  }

}
