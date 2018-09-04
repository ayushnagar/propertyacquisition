import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PropertyService } from '../services/property.service';

import {Property} from '../models/property';
import {PropertyScreening} from '../models/propertyScreening';
import { questionService } from '../services/question-service.service';

declare let alertify : any;

@Component({
  selector: 'app-property-rerc1-feedback',
  templateUrl: './property-rerc1-feedback.component.html',
  styleUrls: ['./property-rerc1-feedback.component.css'],
  providers : [PropertyService, questionService]
})
export class PropertyRerc1FeedbackComponent implements OnInit {

  property : Property;
  propertyID : number;
  propertyName : string;
  propertyDetails : string;
  screeningdetails : any[] = [];
  screening2details : any[] = [];
  large_Image : string = "assets/images/property1/img1.jpg";
  img_list : any = ["assets/images/property1/img1.jpg", "assets/images/property1/img2.jpg",
                    "assets/images/property1/img3.jpg"]
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
  visitStatus : string;
  keys : any[] = [];

  options = [{ id: 1, color : "#006400", Title : "Ideal Location - Good to go ahead with proposal"},
             { id: 2, color : "#00FF00", Title : "In-principle Approved - Require Site visit"},
             { id: 3, color : "#FFC200", Title : "Require site visit for feedback"},
             { id: 4, color : "#FF0000", Title : "Proposal Rejected"}];
  brandheadopt : string;           
  propertyScreening : PropertyScreening;
  feedback : string;

  constructor(private activatedRoutes : ActivatedRoute, private propertyService : PropertyService,
              private router : Router) { 
      this.userName = localStorage.getItem("UserName");
      this.designation = localStorage.getItem("Designation");
      this.userID = parseInt(localStorage.getItem("UserID"));
      this.activatedRoutes.queryParams.subscribe((params : Params) => {
      let PropertyID = params['ID'];
      this.propertyID = parseInt(PropertyID);
      localStorage.setItem("Property_ID", this.propertyID.toString());
      this.getPropertyDetails(this.propertyID);
      this.getScreeningDetails_ByID(this.propertyID);
      this.getAfterVisitQuestionResult(this.propertyID);
      this.propertyService.isRec1ScreeningDone_ByProperty_ByUserID(this.userID, this.propertyID)
        .subscribe((res : string) =>{
          //console.log(res);
          this.isScreenDone = res.replace('\"', '').replace('\"','');

          //console.log("Detail " + this.isScreenDone);
        });
      this.visitscheduleStatus(0, this.propertyID);
    });
    this.propertyScreening = new PropertyScreening(); 
  }

  ngOnInit() {
    // setTimeout(() => {
    //  this.screeningdetails.filter(item => parseInt(item.User_ID) === this.userID);
    //     console.log(this.userID);
    //     console.log("Data is " + this.isScreenDone.length);
    //   }, 2000);
    
  }

  onover(item : string){
    this.large_Image = item;
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
        this.propertyName = this.property.PropertyName + ", " + this.property.Address + ", " + this.property.City + ", " + this.property.State;
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

  select(event){
    this.selectedOption = event.srcElement.textContent;
  }

  insertNewScreeningDetails(){
    this.propertyScreening.Property_ID = parseInt(localStorage.getItem("Property_ID"));
    this.propertyScreening.User_ID = parseInt(localStorage.getItem("UserID"));
    this.propertyScreening.Screening_Answer = this.selectedOption;
    this.propertyScreening.Site_Feedback = this.feedback;
    this.propertyScreening.Rejection_Reason = '';

    //console.log(this.propertyScreening);

    this.propertyService.insertPropertyScreening(this.propertyScreening)
      .subscribe((res : any) => {
        //localStorage.setItem("PropertyID", res.ID);
        this.router.navigate(['/home']);
      });

  }

  save(){
    let self = this;
    alertify.confirm('Are you sure you want to Submit?', function(e){
      if(e){

        self.insertNewScreeningDetails();
        alertify.success("Feedback Submitted");
        //self.router.navigate(["/propertycreation"]);
        
      }
    }).setHeader("Confirmation");
    
    setTimeout(
      ()=>{
        this.router.navigate(["/home"]);
      }, 9000
    );
  }

  visitscheduleStatus(type: number, propertyID: number){
    this.propertyService.visitPropertyStatus(type, propertyID)
      .subscribe((data : any) => {
        console.log(data);
        if(data == 'Screening 1 in Progress'){
          this.visitStatus = "1";
          
        }
        else if(data == 'Site Visit Scheduled'){
          this.visitStatus = "2";
          //alertify.message('Staus Updated.');
        }
        else if(data == 'Screening 2 in Progress'){
          this.visitStatus = "3";
          //alertify.message('Staus Updated.');
        }
      });
  }

  visitschedule(type : string){
    this.visitscheduleStatus(parseInt(type), this.propertyID);
    alertify.success('Status Updated.');
    //if(type == "2" || type == "3")
      this.router.navigate(['/home']);
  }

  getAfterVisitQuestionResult(propertyID: number){
    this.propertyService.getPropertyScreeningDetails_AfterVisit(propertyID)
      .subscribe((data)=> {
        if(data.length > 0){
          this.keys = Object.keys(data[0]);
          this.screening2details = data.map(elem =>{

              let obj = [];
              this.keys.forEach(key => obj.push({key : key, value : elem[key]}));
              return obj;
              
            
          });
        }
        //console.log(this.screening2details);
      });

      
  }
}
