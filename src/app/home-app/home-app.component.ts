import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property';

@Component({
  selector: 'app-home-app',
  templateUrl: './home-app.component.html',
  styleUrls: ['./home-app.component.css'],
  providers : [PropertyService]
})
export class HomeAppComponent implements OnInit {

  // data : [
  //   // { propertyName : 'The Thane Shop', img : '/assets/images/property1/img1.jpg', 
  //   //   status : 'Awaiting Operational Head Confirmation', createdDate : '20th June 2018'},
  //   // { propertyName : 'The Raymond Shop', img : '/assets/images/property1/img2.jpg', 
  //   // status : 'Awaiting Brand Head Confirmation', createdDate : '18th June 2018' }  
  //   {id: 1},{id : 2}
  // ];
  userName : string;
  data : any[] = [];
  statusCompleteColor : string = "#008000";
  statusReject : string = "#ff0000";
  statusColor : string = "#000000";

  constructor(private router : Router, private http: Http, private propertyService: PropertyService) { 
    //console.log('Home Called :' + localStorage.getItem('Current_Login_Active'));
    this.userName = localStorage.getItem("UserName");
    if(this.userName == 'admin'){
      //console.log('By Type');
      this.getPropertyDetails_byType("All");
    }
    else{
      //console.log('By User');
      //console.log(this.userName);
      this.getPropertyDetails_byType_byUser('All', this.userName);
    }
    
  }

  ngOnInit() {
  }

  onNewProperty(){
    this.router.navigate(['/propertycreation']);
  }

  getPropertyDetails_byType(type : string){
    this.propertyService.getPropertDeatils_byType(type)
      .subscribe((details : any[]) => 
      {
        this.data = details;
        //console.log(this.data);
      });
  }

  getPropertyDetails_byType_byUser(type : string, userName: string){
    this.propertyService.getPropertDeatils_byType_byUser(type, userName)
      .subscribe((details : any[]) => 
      {
        this.data = details;
        //console.log(this.data);
      });
  }

  projectCompleted(propertyID : number){
    this.propertyService.visitPropertyStatus(3, propertyID)
      .subscribe((data)=> {
        if(data != '')
          this.getPropertyDetails_byType("All");
      });
  }

  projectReject(){

  }

  link(type : string){
    let user = this.userName = localStorage.getItem("UserName");
    this.getPropertyDetails_byType_byUser(type, user);
  }

}
