import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question-service.service';

@Component({
  selector: 'app-new-property-questionnaries',
  templateUrl: './new-property-questionnaries.component.html',
  styleUrls: ['./new-property-questionnaries.component.css'],
  providers: [QuestionService]
})
export class NewPropertyQuestionnariesComponent implements OnInit {

  /* Second Form*/
  propertyName : string;
  propertyDesc: string;
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

  constructor(private questions: QuestionService) { 
    this.loadPropertyDetails();
      this.getRec1questions();
      this.notFilled();
  }

  ngOnInit() {
  }

  /* Form Questionnaries */
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

  loadPropertyDetails(){
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

  savequestionnaries(){
    
    this.additional_details = this.options1 + ";" + this.options2 + ";" + this.options3 + ";Built Area :" + this.builtArea + ";Carpet Area :" + this.carpetArea;
    localStorage.setItem("Additional_Details", this.additional_details);
    localStorage.setItem("Location_link", this.locationlink);
    //this.router.navigate(['/upload']);
    //console.log( + ", " + this.carpetArea);
  }

}
