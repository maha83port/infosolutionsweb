import { Component,  OnInit, AfterViewInit  } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd  } from '@angular/router';
import { ApiService} from './api.service';
import { Location, PopStateEvent } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  urlvalue: string;
  url: any;
  pageclass: string;
  public login: boolean;  
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  constructor(public router: Router, private route: ActivatedRoute, private ApiService: ApiService,  private location: Location) { 
    
  }
  ngOnInit() {
    this.location.subscribe((ev:PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
  });
  this.router.events.subscribe((ev:any) => {
      if (ev instanceof NavigationStart) {
          if (ev.url != this.lastPoppedUrl)
              this.yScrollStack.push(window.scrollY);
      } else if (ev instanceof NavigationEnd) {
          if (ev.url == this.lastPoppedUrl) {
              this.lastPoppedUrl = undefined;
              window.scrollTo(0, this.yScrollStack.pop());
          } else
              window.scrollTo(0, 0);
      }
  });
   
    console.log('app' + this.router.url);
    this.urlvalue = '/';
    this.url = ['/', '/home', '/about'];

    
  }
  logouts(){
    
    if (this.ApiService.getLocalSession('currentUser') === null) {
      return false;
    } else {
      return true;
     
    }
  }

  logins(){
    
    if (this.ApiService.getLocalSession('currentUser') === null) {
      return true;
    } else {
      return false;
     
    }
  }
  menuSwitch() {
    let stringToSplit = this.router.url;
    let x = stringToSplit.split("/");
    /*if (this.url.includes(this.router.url)) {
      return false;
    } else if (x[1] == 'resetpassword') {
      return false;
    } else {
      return true;
    }*/
    if(x[1]  == 'home')
    {
      return "homepage";

    }else if(x[1] == 'about'){
      return "subPage aboutPage";
    }else if(x[1] == 'services'){
      return "subPage servicePage";
    }
    else if(x[1] == 'faq'){
      return "subPage faq";
    }else if(x[1] == 'price'|| x[1] == "general" || x[1] == "medical" || x[1] == "insurance" || x[1] == "captions-subtitles" || x[1] == "data-research-lead-generation" || x[1] == "get-free-quote"){
      return "subPage servicePage";
    }else if(x[1] == 'contact'){
      return "subPage contactPage";
    }else if(x[1] == 'education'){
      return "subPage servicePage education";
    }else if(x[1] == 'login'){
      return "subPage contactPage";
    }else {
      return "homepage";
    }

    
  }

  public logout(){    
        localStorage.removeItem('currentUser');
        //localStorage.removeItem('current_session_id');        
        this.router.navigateByUrl('/index');       
    
  }
}