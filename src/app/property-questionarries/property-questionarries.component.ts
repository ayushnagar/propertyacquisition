import { Component, OnInit } from '@angular/core';
import { questionService } from '../services/question-service.service';

import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { isUndefined } from 'util';



@Component({
  selector: 'app-property-questionarries',
  templateUrl: './property-questionarries.component.html',
  styleUrls: ['./property-questionarries.component.css'],
  providers : [questionService, DatePipe]
})
export class PropertyQuestionarriesComponent implements OnInit {

  

  propertyName : string;
  propertyDesc : string;
  builtArea : string;
  carpetArea : string;
  questionnaries : any[];
  options1 : string;
  options2 : string;
  options3 : string;
  locationlink : string;
  additional_details : string;
  startdate : string;
  validateDate : Date;
  selectedDate : Date;
  dateCompare : string;

  constructor(private questions: questionService
              , private router : Router, private datePipe: DatePipe) {
    
    this.validateDate = new Date();
    this.dateCompare = this.datePipe.transform(this.validateDate, 'yyyy-MM-dd');
    //console.log(this.validateDate.toDateString());
    // this.question1 = "Brand Name : 'Any Others____' option to be included for any new brand ";
    // this.question2 = "Store Type : Based on Selection, checklist in RERC 2 will change ";
    // this.question3 = "Store Format : This should not be mandatory and can be filled afterwards";
    // this.question4 = "Super Built Area (In Square Feet)";
    // this.question5 = "Carpet Area (In Square Feet)";
    // this.propertyName = localStorage.getItem("propertyName");
    // this.propertyDesc = localStorage.getItem("Address") + " , " + localStorage.getItem("cityName") + " , " + localStorage.getItem("stateName") ;
    this.loadPropertyDeatails();
    this.getRec1questions();
    this.notFilled();
    
   }

  ngOnInit() {
  }

  getRec1questions(){
    this.questions.getRec1Questions()
      .subscribe((res : any[])=>{
        this.questionnaries = res;
        
      });
  }

  dateSelect(){
    this.validateDate = new Date(this.dateCompare);
    this.selectedDate = new Date(this.startdate);
    //alert(this.validateDate);
    if(this.selectedDate < this.validateDate){
      this.startdate = '';
      alert('Date selected is incorrect');
      return;
    }
  }

  notFilled(){
    
    if(this.startdate == undefined || this.options1 == undefined || 
      this.options2 == undefined || this.options3 == undefined
      || this.builtArea == undefined || this.carpetArea == undefined){
        
        return true;
    }
    else{
      
      return false;
    }
  }

  loadPropertyDeatails(){
    // let id : number = parseInt(localStorage.getItem('PropertyID'));
    // this.propertyService.getPropertDeatils(id)
    //   .subscribe((res : any) => {
    //     this.propertyName = res.PropertyName;
    //     this.propertyDesc = res.Address + ', ' + res.City + ', ' + res.State;
    //   });
    this.propertyName = localStorage.getItem("PropertyName");
    this.propertyDesc = localStorage.getItem("Address") + ", " + localStorage.getItem("CityName") + ", " + localStorage.getItem("StateName");
  }

  getRadioSelection(options : string, optionsVal : string){
    //alert(options);
    if(options == "0"){
      this.options1 = "Brand Name : " + optionsVal;
    }
    else if(options == "1"){
      this.options2 = "Store Type : " + optionsVal;
    }
    else if(options == "2"){
      this.options3 = "Store Format : " + optionsVal;
    }
  }

  // getRadioSelection(){
  //   alert('Hi');
  // }

  save(){
    
    this.additional_details = this.options1 + ";" + this.options2 + ";" + this.options3 + ";Built Area :" + this.builtArea + ";Carpet Area :" + this.carpetArea;
    localStorage.setItem("Additional_Details", this.additional_details);
    localStorage.setItem("Location_link", this.locationlink);
    this.router.navigate(['/upload']);
    //console.log( + ", " + this.carpetArea);
  }

}
