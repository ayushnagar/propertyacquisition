import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class QuestionService {

  url : string = "https://raymondcentral.com/PropertyAquisitionAPI/api/Question";

  constructor(private http: Http) { }

  getRec1Questions(){

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let url = "/getRec1";
    return this.http.get(this.url + url)
    .pipe(map((res : any) => res.json()));
  }

  getRec2Questions(propertyID : number){
    console.log("property " + propertyID);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let url = "/getRec2?propertyID=" + propertyID;
    return this.http.get(this.url + url)
    .pipe(map((res : any) => res.json()));
  }
}
