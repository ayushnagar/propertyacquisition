import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import {Property} from '../models/property';
import { ScreeningAnswer } from '../models/screeningAnswer';

import { PropertyService } from '../services/property.service';
import { questionService } from '../services/question-service.service';

declare let alertify : any;

@Component({
  selector: 'app-property-rec2-feedback',
  templateUrl: './property-rec2-feedback.component.html',
  styleUrls: ['./property-rec2-feedback.component.css'],
  providers : [PropertyService, questionService]
})
export class PropertyRec2FeedbackComponent implements OnInit {

  property : Property;
  propertyID : number;
  propertyName : string;
  propertyDetails : string;

  brandDetails : string ;
  storeType : string;
  storeFormat : string;
  builtArea : string ;
  carpetArea : string ;
  selectedOption : string;
  userName : string;
  designation : string;
  userID : number;
  isScreenDone : string;
  screeningdetails : any[];
  questionnaries : any[] = [];
  colorGreen : string = "#33FF33";//"#008000";
  colorAmber : string = "#FFCC33";//"#FFC200";
  colorRed : string = "#ff3232";//"#FF0000";
  location_link : string;
  questionsCount : number;
  screeningAnswer : ScreeningAnswer;
  screeningAnswerArray : ScreeningAnswer[] = [];
  resultCount : number = 0;
  status : any[] = [];

  constructor(private activatedRoutes: ActivatedRoute, private route : Router,
              private propertyService : PropertyService, private questions: questionService) { 
    this.userName = localStorage.getItem("UserName");
    this.designation = localStorage.getItem("Designation");
    this.userID = parseInt(localStorage.getItem("UserID"));
    this.activatedRoutes.queryParams.subscribe((params : Params) => {
      let PropertyID = params['ID'];
      this.propertyID = parseInt(PropertyID);
      this.propertyService.getPropertyScreeningStatus_ByUser(this.propertyID, this.userID)
          .subscribe((data)=> {
            this.status = data;
            console.log(this.status[0]["screening2"]);
            if(this.status[0]["screening2"] == "1")
            {
              window.location.href = "propertyrercfeedback?ID=" + this.propertyID;
              //this.route.navigate(['/propertyrercfeedback?ID=' + this.propertyID]);
              return;
            }
          });
      
      localStorage.setItem("Property_ID", this.propertyID.toString());
      this.getPropertyDetails(this.propertyID);
    //this.getScreeningDetails_ByID(this.propertyID);
      this.getRec2questions(this.propertyID);
    });

    //this.screeningAnswer = new ScreeningAnswer();

    //this.screeningAnswerArray = new ScreeningAnswer;

  }

  ngOnInit() {
  }

  getPropertyDetails(propertyID : number){
    this.propertyService.getPropertyDetails(propertyID)
      .subscribe((data : Property) => {
        this.property = data;
        let details : any[] = this.property.Additional_Details.split(';');
        this.brandDetails = details[0];
        this.storeType = details[1];
        this.storeFormat = details[2];
        this.builtArea = details[3];
        this.carpetArea = details[4];
        this.location_link = this.property.Location_Link;
        this.propertyName = this.property.PropertyName;
        this.propertyDetails = this.property.Address + ", " + this.property.City + ", " + this.property.State;
      });
    
  }

  getScreeningDetails_ByID(propertyID: number){
    this.propertyService.getPropertyScreeningDetails(propertyID)
      .subscribe((data : any[]) => {
        this.screeningdetails = data;
        //console.log("Data is " + this.screeningdetails);
        //this.getPropertyDetails();
      });
  }

  getRec2questions(propertyID: number){
    //console.log(propertyID);
    this.questions.getRec2Questions(propertyID)
      .subscribe((res : any[])=>{
        this.questionnaries = res;
        this.questionsCount = res.length;
        //console.log("Question count " + this.questionsCount);
        //console.log(this.questionnaries);
      });
  }

  pointsSystem(index : number, question: string, optionSelected : string,values : number, color: string){
      
      // this.screeningAnswer.userID = parseInt(localStorage.getItem("UserID"));
      // this.screeningAnswer.propertyID = this.propertyID;
      // this.screeningAnswer.optionRow = index;
      // this.screeningAnswer.question = question;
      // this.screeningAnswer.optionSelected = optionSelected; 
      // this.screeningAnswer.optionValue = values;  
      // this.screeningAnswer.optionColor = color;

      // console.log(this.screeningAnswer);

      if(color == "#33FF33")//Green
      {
        color = "#008000";
        //this.colorRed = "#ff3232";
        //this.colorAmber = "#FFCC33";
        //this.colorGreen = color;
      }
      else if(color == "#FFCC33"){//Amber
        color = "#FFC200";
      }
      else if(color == "#ff3232"){//Red
        color = "#FF0000";
      }

      if(this.questionnaries.find((item)=> item.Questions == question) != null){
        //let quest = this.questionnaries.find((item)=> item.Questions == question);
        //console.log(index);
        //let opt = quest.Answers.find((item) => item.Options == optionSelected);
        this.questionnaries.find((item)=> item.Questions == question).
          Answers.find((item) => item.ID == index).Color = color;

        if(index == 1){
          
          this.questionnaries.find((item)=> item.Questions == question).
          Answers.find((item) => item.ID == 2).Color = "#FFFFFF";

          this.questionnaries.find((item)=> item.Questions == question).
          Answers.find((item) => item.ID == 3).Color = "#FFFFFF";
        }
        else if(index == 2){
          this.questionnaries.find((item)=> item.Questions == question).
          Answers.find((item) => item.ID == 1).Color = "#FFFFFF";

          this.questionnaries.find((item)=> item.Questions == question).
          Answers.find((item) => item.ID == 3).Color = "#FFFFFF";
        }
        else if(index == 3){
          this.questionnaries.find((item)=> item.Questions == question).
          Answers.find((item) => item.ID == 1).Color = "#FFFFFF";

          this.questionnaries.find((item)=> item.Questions == question).
          Answers.find((item) => item.ID == 2).Color = "#FFFFFF";
        }
        
      }

      if(this.screeningAnswerArray.find((item) => item.question == question) != null){
        //console.log("Value : " + question);
        let item = this.screeningAnswerArray.find((item) => item.question == question);
        this.screeningAnswerArray.splice(this.screeningAnswerArray.indexOf(item),1);
      }

      this.screeningAnswerArray.push(new ScreeningAnswer(this.propertyID, parseInt(localStorage.getItem("UserID")),
              question, optionSelected, values, color));
      //console.log(this.screeningAnswerArray);
      
      
      // this.screeningAnswerArray[index] = this.screeningAnswer;
  }

  saveScreening2(){
    //console.log("Saving data :" + this.screeningAnswerArray.length);
    if(this.questionsCount == this.screeningAnswerArray.length){
      for(var i=0; i < this.screeningAnswerArray.length; i++){
        //console.log(this.screeningAnswerArray[i]);
        this.propertyService.insertPropertyScreening_afterVisit(this.screeningAnswerArray[i])
          .subscribe((data) => {
            if(data == '1'){
              this.resultCount++;
              //console.log("i value: " + i);
              if(i == this.screeningAnswerArray.length){
                alertify.success("Feedback Submitted");
                this.route.navigate(['/home']);
              }
              
            }
          });
      }
      
    }
    else{
      alert('You have not attempted all questions');
      return;
    }
  }
}
