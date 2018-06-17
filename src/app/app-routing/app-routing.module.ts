import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { LoginComponent } from '../login/login.component';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserRequestComponent } from '../user-request/user-request.component';
import { AuthGuard } from '../auth.guard';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { GeneralComponent } from '../general/general.component';
import { EducationComponent } from '../education/education.component';
import { MedicalComponent } from '../medical/medical.component';
import { InsuranceComponent } from '../insurance/insurance.component';
import { ServicesComponent } from '../services/services.component';
import { CaptionsSubtitlesComponent } from '../captions-subtitles/captions-subtitles.component';
import { DataResearchLeadGenerationComponent } from '../data-research-lead-generation/data-research-lead-generation.component';
import { FaqComponent } from '../faq/faq.component';
import { PriceComponent } from '../price/price.component';
import { ContactComponent } from '../contact/contact.component';
import { GetFreeQuoteComponent } from '../get-free-quote/get-free-quote.component';
import { RegisterComponent } from '../register/register.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { TranscriptionFileComponent } from '../transcription-file/transcription-file.component';

import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';
import { PaymentListComponent } from '../payment-list/payment-list.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'index', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },  
  { path: 'general', component: GeneralComponent, pathMatch: 'full' },  
  { path: 'education', component: EducationComponent, pathMatch: 'full' },    
  { path: 'medical', component: MedicalComponent, pathMatch: 'full' },  
  { path: 'insurance', component: InsuranceComponent, pathMatch: 'full' },  
  { path: 'services', component: ServicesComponent, pathMatch: 'full' },  
  { path: 'captions-subtitles', component: CaptionsSubtitlesComponent, pathMatch: 'full' },  
  { path: 'data-research-lead-generation', component: DataResearchLeadGenerationComponent, pathMatch: 'full' },  
  { path: 'faq', component: FaqComponent, pathMatch: 'full' }, 
  { path: 'price', component: PriceComponent, pathMatch: 'full' },
  { path: 'contact', component: ContactComponent, pathMatch: 'full' },
  { path: 'get-free-quote', component: GetFreeQuoteComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
  { path: 'register', component: RegisterComponent, pathMatch: 'full'},
  { path: 'forgot-password', component: ForgotPasswordComponent, pathMatch: 'full'}, 
  { path: 'reset-password/:id', component: ResetPasswordComponent, pathMatch: 'full'},
  { path: 'transcription-file/:sid/:sname', component: TranscriptionFileComponent, pathMatch: 'full'},
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard]},
  { path: 'payment-list', component: PaymentListComponent, canActivate: [AuthGuard]},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
