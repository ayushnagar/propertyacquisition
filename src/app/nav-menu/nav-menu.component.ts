import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  userName : string;
  designation : string;
  constructor() { 
    // this.userName = "Ayush Nagar";
    // this.designation = "Admin";
  }

  ngOnInit() {
  }

}
