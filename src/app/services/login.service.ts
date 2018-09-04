import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {
  login : any;
  url : string = "https://raymondcentral.com/PropertyAquisitionAPI/api/Login/";
  
  constructor(private http: Http) { }

  getState(state : string){
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let url = "/GetStateCityData?state=" + state;
    //console.log(this.url + url);
    return this.http.get(this.url + url, {headers : headers})
    .pipe(map((res : any) => res.json()));
      
  }

  getLogin(userName : string, password : string){
    var data = "username=" + userName + "&password=" + password + "&login_type=1";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.url = this.url + "GetUser?" + data;
    return this.http.get(this.url, {headers : headers})
      .pipe(map((res : any) => res.json()));
      
  }

  getLogout(userName : string, password : string){
    var data = "username=" + userName + "&password=" + password + "&login_type=0";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.url = this.url + "GetUser?" + data;
    return this.http.get(this.url, {headers : headers})
      .pipe(map((res : any) => res.json()));
      
  }

}
