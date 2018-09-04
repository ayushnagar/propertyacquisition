import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
let alertify : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [LoginService]
})
export class LoginComponent implements OnInit {
  username : string;
  password : string;

  constructor(private router : Router, private logService : LoginService) {
    localStorage.setItem("Current_Login_Active","false");
    console.log(localStorage.getItem("isLogIn"));
    document.body.style.backgroundImage = "url('../../assets/images/bg.jpg')";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
   }

  ngOnInit() {
    localStorage.setItem("Current_Login_Active","false");
  }

  // private extractData(res : Response){
  //   let body = res.text();
  //   console.log(body.User_Name);
  // }

  login(){
    //localStorage.setItem("isLogIn", "true");
    this.logService.getLogin(this.username, this.password)
      .subscribe((data : any) => {
        if(data.User_Name != null){
          localStorage.setItem('UserID', data.UserID);
          localStorage.setItem('UserName', data.User_Name);
          localStorage.setItem('Name', data.Name);
          localStorage.setItem('Designation', data.Designation);
          localStorage.setItem('EmailAdd', data.Email_Add);
          localStorage.setItem('Last_Login', data.Last_Login);
          localStorage.setItem('Current_Login_Active', data.Current_Login_Active);
          //console.log('Login Called :' + localStorage.getItem('Current_Login_Active'));
          //if(this.username == "admin"){
            //this.router.navigate(['/home']);
          //}
          window.location.href="/home";
        }
        else{
          //console.log("Error");
          alert("Invalid User Name or Name");
          this.username = "";
          this.password = "";
          //alertify.error("Invalid User Name or Password");
        }
      },
      (err : HttpErrorResponse)=>{
        localStorage.setItem("Current_Login_Active","false");
        alert("Not able to connect to the service. Please coordinate with the administrator");
          this.username = "";
          this.password = "";
        
      }
    );
    
    

    //  if(this.username == "admin"){
    //    this.router.navigate(['/home']);
    //  }
    // else if(this.username == "brandhead"){
    //   this.router.navigate(['/propertyrercfeedback']);
    // }
    // else if(this.username == "nationalhead"){
    //   this.router.navigate(['/propertyrercnhfeedback']);
    // }
    // else if(this.username == "operationalhead"){
    //   this.router.navigate(['/propertyrercohfeedback']);
    // }
    // else if(this.username == "director"){
    //   this.router.navigate(['/propertyrercpdfeedback']);
    // }
  }

  ngOnDestroy(){
    document.body.style.backgroundImage = "none";
  }
}
