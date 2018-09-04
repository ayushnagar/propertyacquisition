import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { 
    // localStorage.removeItem('UserID');
    // localStorage.removeItem('UserName');
    // localStorage.removeItem('Name');
    // localStorage.removeItem('Designation');
    // localStorage.removeItem('EmailAdd');
    // localStorage.removeItem('Last_Login');
    // localStorage.removeItem('Current_Login_Active');

    //this.router.navigate(['']);
    window.location.href="";
  }

  ngOnInit() {
  }

}
