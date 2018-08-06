import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable()
export class ApiService {
  private appURL: string = environment.apiUrl;
  private siteUrl: string = environment.siteUrl;

  constructor(private http: HttpClient) { }

  login(customer) {
    return this.http.post(this.appURL + 'login', JSON.stringify({ customer: customer }));
  }
  register(user){
    return this.http.post(this.appURL + 'signUp', JSON.stringify({ user: user }));
  }
  // Get Login user data from Localstorage
  getLocalSession(sessionData) {
    return localStorage.getItem(sessionData);
  }
  // Get Login user data from Localstorage
  setLocalSession(data, name) {
    localStorage.setItem(name, JSON.stringify(data));
  }
  forgotpassword(user){
    return this.http.post(this.appURL + 'forgetPassword', JSON.stringify({ user: user, siteUrl: this.siteUrl }));
  }
  verifyToken(user){
    return this.http.post(this.appURL + 'verifyToken', JSON.stringify({ user: user }));
  }
  resetPassword(user){
    return this.http.post(this.appURL + 'resetPassword', JSON.stringify({ user: user }));
  }
  getServiceList(){
    return this.http.get(this.appURL + 'getServiceList');
  }
  getFilesList(session_id){
    return this.http.post(this.appURL + 'getFilesList', JSON.stringify({ session_id: session_id }));
  }
  deleteFilesList(id){
    return this.http.post(this.appURL + 'deleteFilesList', JSON.stringify({ id: id }));
  }
  deleteOrderFilesList(id){
    return this.http.post(this.appURL + 'deleteOrderFilesList', JSON.stringify({ id: id }));
  }
  updateFilesList(e, options, id, service_id){
    return this.http.post(this.appURL + 'updateFilesList', JSON.stringify({ e: e, options:options, id:id, service_id: service_id }));
  }
  saveOrderList(fileList, currUser, disc){
    return this.http.post(this.appURL + 'saveOrderList', JSON.stringify({ fileList: fileList, currUser : currUser, disc: disc }));
  }
  billing(billing, user){
    return this.http.post(this.appURL + 'saveBilling', JSON.stringify({ billing: billing, currUser: user }));
  }
  saveOrderData(user,session_id, mode)
  {
    return this.http.post(this.appURL + 'saveOrderData', JSON.stringify({ currUser: user,session_id: session_id, mode: mode}));
  }
  getOrderList(user,session_id){
    console.log(session_id);
    return this.http.post(this.appURL + 'getOrderList', JSON.stringify({ currUser: user,session_id: session_id }));
  }
  getUserPurchase(user){
    return this.http.post(this.appURL + 'getUserPurchase', JSON.stringify({ currUser: user }));
  }
  saveFreeQuote(freeQuote){
    return this.http.post(this.appURL + 'saveFreeQuote', JSON.stringify({ freeQuote: freeQuote }));
  }
  updateLang(id, lang_id, option){
    return this.http.post(this.appURL + 'updateLang', JSON.stringify({ id: id, lang_id: lang_id, option: option }));
  }
  checkCouponCode(user, session_id, coupon){
    return this.http.post(this.appURL + 'checkCouponCode', JSON.stringify({ user: user, session_id: session_id, coupon: coupon }));
  }
  addUrl(url, session_id, service_id, service_name){
    return this.http.post(this.appURL + 'addUrl', JSON.stringify({ url: url, session_id: session_id, service_id: service_id, service_name:service_name }));
  }

}
