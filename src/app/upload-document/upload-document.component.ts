import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {

  apiUrl : string = "https://raymondcentral.com/PropertyAquisitionAPI/api/Image/uploadImage";
  comments : string = "Upload";
  imagesUpload : File;
  fileUploaded : any[] = [];
  imageFile : string = "";
  uploadedList : any[] = [];

  constructor(private http: Http, private httpClient: HttpClient,
              private router: Router) { }

  ngOnInit() {
  }

  handleInputFile(file: FileList){
    //this.imagesUpload = file.item(0);
    //console.log(this.imagesUpload.name);
    var reader = new FileReader();
    reader.onload = (event: any) =>{
      //console.log(event.target.result);
      this.imageFile = event.target.result;
      this.fileUploaded.push({name : file.item(0).name, file: file.item(0), status : 'Not Uploaded'});
    }

    reader.readAsDataURL(file.item(0));
    //console.log(this.fileUploaded);
  }

  preview(){
    //console.log("hit");
    this.router.navigate(["/propertypreview"]);
  }


  uploadImage(){
    
    for(var i=0; i < this.fileUploaded.length; i++){
      const formdata : FormData = new FormData();
      this.imagesUpload = this.fileUploaded[i].file;
      let name : string = this.fileUploaded[i].name;
      formdata.append('Image', this.imagesUpload);
      formdata.append('PropertyName', localStorage.getItem("PropertyName"));
    //formdata.append('Comment', this.comments);
      //console.log(formdata);
      this.httpClient.post(this.apiUrl, formdata,{
        reportProgress : true,
        observe :'events'
      })
        .subscribe(event => {
            if(event.type === HttpEventType.UploadProgress){
              //console.log('Upload Progress', Math.round(event.loaded / event.total * 100) + '%');this
              let s : object = this.fileUploaded.find((item) => item.name == name);
              //console.log('Uploading' + s);
              this.fileUploaded.splice(this.fileUploaded.indexOf(s), 1);
              //this.fileUploaded.
              //this.fileUploaded.push({name : s[name], file: this.imagesUpload, status : 'Uploading'});
            }
            else if(event.type === HttpEventType.Response){
              let s : string = this.fileUploaded.find((item) => item.name == name);
              //console.log('Uploading' + s);
              // let name : string = this.fileUploaded[i].name;
              // let file : File = this.fileUploaded[i].file;
               //this.fileUploaded.splice(this.fileUploaded.indexOf(i), 1);
               //this.fileUploaded.splice(this.fileUploaded.find((item) => item.name == name), 1);
               //this.fileUploaded.push({name : name, file: this.imagesUpload, status : 'Uploaded'});
               this.uploadedList.push({name : name, 
                file : 'https://raymondcentral.com/PropertyAquisition/Images/' + localStorage.getItem("PropertyName") + "/" + name});
            }
        });
    }
    // const formdata : FormData = new FormData();
    // formdata.append('Image', this.imagesUpload);
    // //formdata.append('Comment', this.comments);
    // console.log(formdata);
    // this.http.post(this.apiUrl, formdata)
    //   .subscribe(data => {
    //     console.log(data);
    //   });
    
 
  }





}
