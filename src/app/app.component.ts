import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  links = ['Home', 'View','Sadfsdfsdfsdfsdfdsfdsfsdfsdfef'];
  isLoggedIn : boolean;

  constructor() {
    console.log("App Called : " + localStorage.getItem("Current_Login_Active"));
    if(localStorage.getItem("Current_Login_Active") != null){
      if(localStorage.getItem("Current_Login_Active") == "true"){
        this.isLoggedIn = true;
      }
      else{
        this.isLoggedIn = false;
        localStorage.removeItem('UserID');
        localStorage.removeItem('UserName');
        localStorage.removeItem('Name');
        localStorage.removeItem('Designation');
        localStorage.removeItem('EmailAdd');
        localStorage.removeItem('Last_Login');
        localStorage.removeItem('Current_Login_Active');
      }
    }
    else{
      this.isLoggedIn = false;
      localStorage.removeItem('UserID');
      localStorage.removeItem('UserName');
      localStorage.removeItem('Name');
      localStorage.removeItem('Designation');
      localStorage.removeItem('EmailAdd');
      localStorage.removeItem('Last_Login');
      localStorage.removeItem('Current_Login_Active');
    }

    console.log("Active : " + this.isLoggedIn);
  }
}
