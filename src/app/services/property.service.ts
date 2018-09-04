import { Injectable } from '@angular/core';
import { Http, HttpModule} from '@angular/http';
import { Observable } from 'rxjs';
import {Property} from '../models/property';
import { map } from 'rxjs/operators';
import { PropertyScreening } from '../models/propertyScreening';
import { ScreeningAnswer } from '../models/screeningAnswer';

@Injectable()
export class PropertyService {

  property : Property;
  url : string = "https://raymondcentral.com/PropertyAquisitionAPI/api/Property/";

  constructor(private http: Http) {
    this.property = new Property();
   }

   insertProperty(prop : Property): Observable<Property>
   {
     //console.log(prop);
     let urlMethod = "insertPropertyDetails";
      return this.http.post(this.url + urlMethod, prop)
      .pipe(map((res : any) => res.json()));
   }

   insertPropertyScreening(prop : PropertyScreening){
     let urlMethod = "insertScreeningDetails";
     return this.http.post(this.url + urlMethod, prop)
      .pipe(map((res : any) => res.json()));
   }

   insertPropertyScreening_afterVisit(prop : ScreeningAnswer){
    let urlMethod = "insert_propertyAfterVisitScreening_single";
    return this.http.post(this.url + urlMethod, prop)
     .pipe(map((res : any) => res.json()));
  }

   getPropertyDetails(propertyID: number){
     let urlMethod = "getPropertyDetails?propertyID=" + propertyID;
     let header = new Headers({ 'Content-Type': 'application/json' });
     return this.http.get(this.url + urlMethod)
     .pipe(map((res : any) => res.json()));
   }

   getPropertDeatils_byType(type: string){
    let urlMethod = "getPropertyDetailsByType?type=" + type;
    let header = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + urlMethod)
    .pipe(map((res : any) => res.json()));
  }

  getPropertDeatils_byType_byUser(type: string, userName: string){
    let urlMethod = "getPropertyDetailsByType_ByUser?type=" + type + "&userName=" + userName;
    let header = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + urlMethod)
    .pipe(map((res : any) => res.json()));
  }

  getPropertyScreeningDetails(propertyID: number){
    let urlMethod = "getPropertyScreeningDetails?propertyID=" + propertyID;
    let header = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + urlMethod)
    .pipe(map((res : any) => res.json()));
  }

  getPropertyScreeningDetails_AfterVisit(propertyID: number){
    let urlMethod = "getpropertyAfterVisitScreening_byPropertyID?propertyID=" + propertyID;
    return this.http.get(this.url + urlMethod)
    .pipe(map((res : any) => res.json()));
  }

  getPropertyScreeningStatus_ByUser(propertyID: number, userID : number){
    let urlMethod = "getPropertyScreeningStatus_ByUser?propertyID=" + propertyID + "&userID=" + userID;
    return this.http.get(this.url + urlMethod)
    .pipe(map((res : any) => res.json()));
  }

  isRec1ScreeningDone_ByProperty_ByUserID(userID : number, propertyID : number){
    let urlMethod = "isScreeningRec1Done?userID=" + userID + "&propertyID=" + propertyID;
    let header = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + urlMethod)
    .pipe(map((res : any) => res._body));
  }

  visitPropertyStatus(type: number, propertyID : number){
    let urlMethod = "propertyvisitStatus?type=" + type + "&propertyID=" + propertyID;
    return this.http.get(this.url + urlMethod)
     .pipe(map((res : any) => res.json()));
  }
}
