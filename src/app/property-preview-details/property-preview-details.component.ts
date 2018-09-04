import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../services/property.service';
declare let alertify : any;

import { Property } from '../models/property'

@Component({
  selector: 'app-property-preview-details',
  templateUrl: './property-preview-details.component.html',
  styleUrls: ['./property-preview-details.component.css'],
  providers : [PropertyService]
})
export class PropertyPreviewDetailsComponent implements OnInit {
  property : Property;

  propertyName : string;
  propertyDetails : string;
  large_Image : string = "assets/images/property1/img1.jpg";
  img_list : any = ["assets/images/property1/img1.jpg", "assets/images/property1/img2.jpg",
                    "assets/images/property1/img3.jpg"]
  brandDetails : string ;
  storeType : string;
  storeFormat : string;
  builtArea : string ;
  carpetArea : string ;
  additional_details : any[];
  location_link : string;
  
  constructor(private router: Router, private propertyService : PropertyService) { 
    this.propertyName = localStorage.getItem("PropertyName");
    this.propertyDetails = localStorage.getItem("Address") + ", " + localStorage.getItem("CityName") + ", " + localStorage.getItem("StateName");
    this.additional_details = localStorage.getItem("Additional_Details").split(';');
    this.brandDetails = this.additional_details[0];
    this.storeType = this.additional_details[1];
    this.storeFormat = this.additional_details[2];
    this.builtArea = this.additional_details[3];
    this.carpetArea = this.additional_details[4];
    this.location_link = localStorage.getItem("Location_link");

    this.property = new Property();
  }

  ngOnInit() {
  }

  onover(item : string){
    this.large_Image = item;
  }

  insertNewProperty(){
    this.property.ID = 0;
    this.property.PropertyName = localStorage.getItem("PropertyName");
    this.property.Active = true;
    this.property.Additional_Details = localStorage.getItem("Additional_Details");
    this.property.Address = localStorage.getItem("Address");
    this.property.City = localStorage.getItem("CityName");
    this.property.Country = 'India';
    this.property.CreatedBy = localStorage.getItem('UserName');
    this.property.CreatedDate = '';
    this.property.Location_Link = this.location_link;
    this.property.State = localStorage.getItem("StateName");
    this.property.Status= localStorage.getItem("Status");

    this.propertyService.insertProperty(this.property)
      .subscribe((res : any) => {
        localStorage.setItem("PropertyID", res.ID);
        this.router.navigate(['/home']);
      });
  }

  save(){
    //console.log(this.property);
    let self = this;
    alertify.confirm('Are you sure you want to Submit?', function(e){
      if(e){

        self.insertNewProperty();
        alertify.success("New Property Created");
        //self.router.navigate(["/propertycreation"]);
        
      }
    }).setHeader("Confirmation");
    
    setTimeout(
      ()=>{
        this.router.navigate(["/home"]);
      }, 9000
    );  

  }

}
