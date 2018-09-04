import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userName : string;
  fullname : string;
  email : string;
  designation : string;
  constructor() {
    this.userName = localStorage.getItem('UserName');
    this.fullname = localStorage.getItem('Name');
    this.designation = localStorage.getItem('Designation');
    this.email = localStorage.getItem('EmailAdd');
   }

  ngOnInit() {
  }

}
