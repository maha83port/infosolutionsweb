import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { HttpModule } from '@angular/http';
import { RouterModule, Routes, NavigationEnd} from '@angular/router';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import 'rxjs/Rx';
import { FileUploadService } from './file-upload.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlashMessagesModule } from 'angular2-flash-messages';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserRequestComponent } from './user-request/user-request.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { ApiService } from './api.service';
import { AuthGuard } from './auth.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { GeneralComponent } from './general/general.component';
import { EducationComponent } from './education/education.component';
import { MedicalComponent } from './medical/medical.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { ServicesComponent } from './services/services.component';
import { CaptionsSubtitlesComponent } from './captions-subtitles/captions-subtitles.component';
import { DataResearchLeadGenerationComponent } from './data-research-lead-generation/data-research-lead-generation.component';
import { FaqComponent } from './faq/faq.component';
import { PriceComponent } from './price/price.component';
import { ContactComponent } from './contact/contact.component';
import { GetFreeQuoteComponent } from './get-free-quote/get-free-quote.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TranscriptionFileComponent } from './transcription-file/transcription-file.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { PaymentListComponent } from './payment-list/payment-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserRequestComponent,
    DashboardComponent,
    PagenotfoundComponent,
    HomeComponent,
    AboutComponent,
    GeneralComponent,
    EducationComponent,
    MedicalComponent,
    InsuranceComponent,
    ServicesComponent,
    CaptionsSubtitlesComponent,
    DataResearchLeadGenerationComponent,
    FaqComponent,
    PriceComponent,
    ContactComponent,
    GetFreeQuoteComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    TranscriptionFileComponent,
    UserDashboardComponent,
    PaymentListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,     
    HttpModule,    
    FlashMessagesModule.forRoot(),
  ],
  providers: [AuthGuard, ApiService, FileUploadService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
