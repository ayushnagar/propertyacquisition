import { Routes } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { PropertyCreationComponent } from './property-creation/property-creation.component';
import { PropertyQuestionarriesComponent } from './property-questionarries/property-questionarries.component';
import { PropertyRerc1FeedbackComponent } from './property-rerc1-feedback/property-rerc1-feedback.component';
import { PropertyPreviewDetailsComponent } from './property-preview-details/property-preview-details.component';
import { HomeAppComponent } from './home-app/home-app.component';
import { SiteVisitQuestionnariesComponent } from './site-visit-questionnaries/site-visit-questionnaries.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { PropertyRec2FeedbackComponent } from './property-rec2-feedback/property-rec2-feedback.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';


export const appRoutes : Routes = [
    { path: '', component: LoginComponent },
    { path: 'propertycreation', component: PropertyCreationComponent, canActivate: [AuthGuard]},
    { path : 'propertyquestionnaries', component: PropertyQuestionarriesComponent, canActivate: [AuthGuard]},
    { path : 'propertyrercfeedback', component: PropertyRerc1FeedbackComponent, canActivate: [AuthGuard]},
    // 
    { path : 'propertypreview', component: PropertyPreviewDetailsComponent, canActivate: [AuthGuard]},
    { path: 'home', component : HomeAppComponent, canActivate: [AuthGuard]},
    //{ path : 'propertyrercnhfeedback', component: PropertyRerc1NheadFeedbackComponent, canActivate: [AuthGuard]},
    // { path : 'propertyrercohfeedback', component: ProprtyOheadFeedbackComponent, canActivate: [AuthGuard]},
    // { path : 'propertyrercpdfeedback', component: ProprtyProjDirFeedbackComponent, canActivate: [AuthGuard]},
    // { path : 'sitedocument', component: SiteDocumentComponent, canActivate: [AuthGuard]},
    { path: 'site-visit', component : SiteVisitQuestionnariesComponent, canActivate: [AuthGuard] },
    { path: 'upload', component: UploadDocumentComponent, canActivate: [AuthGuard]},
    { path: 'propertysitevisitfeedback', component: PropertyRec2FeedbackComponent, canActivate: [AuthGuard]},
    { path:'profile', component: UserProfileComponent, canActivate : [AuthGuard]},
    { path: 'logout', component: LogoutComponent},
    { path: '**', redirectTo: 'master' }
];