import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MasterComponent } from './master/master.component';
import { PropertyCreationComponent } from './property-creation/property-creation.component';
import { PropertyQuestionarriesComponent } from './property-questionarries/property-questionarries.component';
import { PropertyRerc1FeedbackComponent } from './property-rerc1-feedback/property-rerc1-feedback.component';
import { PropertyPreviewDetailsComponent } from './property-preview-details/property-preview-details.component';

import { HomeAppComponent } from './home-app/home-app.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { appRoutes } from './routes';
import { SiteVisitQuestionnariesComponent } from './site-visit-questionnaries/site-visit-questionnaries.component';
import { LoginService } from './services/login.service';
import { PropertySchemeQualityComponent } from './property-scheme-quality/property-scheme-quality.component';
import { PropertyRec2FeedbackComponent } from './property-rec2-feedback/property-rec2-feedback.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavMenuComponent,
    MasterComponent,
    PropertyCreationComponent,
    PropertyQuestionarriesComponent,
    PropertyRerc1FeedbackComponent,
    PropertyPreviewDetailsComponent,
    HomeAppComponent,
    UploadDocumentComponent,
    SiteVisitQuestionnariesComponent,
    PropertySchemeQualityComponent,
    PropertyRec2FeedbackComponent,
    LogoutComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot()
  ],
  providers: [LoginService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }