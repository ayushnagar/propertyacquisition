import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-new-property-creation',
  templateUrl: './new-property-creation.component.html',
  styleUrls: ['./new-property-creation.component.css'],
  providers : [LoginService, PropertyService]
})
export class NewPropertyCreationComponent implements OnInit {

  /* First Form */
  
  propertyName : string;
  state : any;
  city : any;
  address : string;
  stateName : string;
  cityName : string;

  constructor(private loginService : LoginService,
    private propertyService : PropertyService) { 

      this.fillState();

    }

  ngOnInit() {
  }

  fillState(){
    this.loginService.getState('').subscribe((res : any) => {
      this.state = res;
    });
  }

  fillCity(states : string){
    this.loginService.getState(states).subscribe((res : any) => {
      //console.log(res);
      this.city = res;
    });
  }

  selectState(){
    //alert(this.stateName);
    //console.log(this.stateName);
    this.fillCity(this.stateName);
  }

  selectCity(){
    //alert(this.cityName);
    localStorage.setItem("cityName", this.cityName);
  }

  save(){
    // alertify.confirm('Are you sure you want to save?', function(e)
    // {
    //   if(e)
    //   {
        //this.property.ID = 0;
        localStorage.setItem("PropertyName", this.propertyName);
        localStorage.setItem("Address", this.address);
        localStorage.setItem("CityName", this.cityName);
        localStorage.setItem("Country", 'India');
        //this.property.CreatedBy = localStorage.getItem('UserName');
        //this.property.CreatedDate = '';
        localStorage.setItem("StateName", this.stateName);
        localStorage.setItem("Status", 'Initiated');
        //this.property.Active = true;

        

        //console.log(this.property);

        //this.router.navigate(['/propertyquestionnaries']);
    //   }
    // });

  }

}
