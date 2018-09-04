import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css'],
  providers : [LoginService]
})
export class MasterComponent implements OnInit {

  userName : string;
  lastLogin : string;
  constructor(private loginService: LoginService, private router: Router) {
    this.userName = localStorage.getItem('Name');
    this.lastLogin = localStorage.getItem('Last_Login');
   }

  ngOnInit() {
  }

  logout(){
    this.loginService.getLogout(localStorage.getItem('UserName'),'as')
      .subscribe(() =>{
        localStorage.removeItem('UserID');
        localStorage.removeItem('UserName');
        localStorage.removeItem('Name');
        localStorage.removeItem('Designation');
        localStorage.removeItem('EmailAdd');
        localStorage.removeItem('Last_Login');
        localStorage.removeItem('Current_Login_Active');

        window.location.href="";
      });


    
  }

  profile(){
    this.router.navigate(['/profile']);
  }

}
