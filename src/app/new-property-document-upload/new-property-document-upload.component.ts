import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-new-property-document-upload',
  templateUrl: './new-property-document-upload.component.html',
  styleUrls: ['./new-property-document-upload.component.css']
})
export class NewPropertyDocumentUploadComponent implements OnInit {

  /*Third Form*/
  apiUrl : string = "https://raymondcentral.com/PropertyAquisitionAPI/api/Image/uploadImage";
  comments : string = "Upload";
  imagesUpload : File;
  fileUploaded : any[] = [];
  imageFile : string = "";
  uploadedList : any[] = [];

  uploader:FileUploader;
  hasBaseDropZoneOver = false;
  constructor() { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url : this.apiUrl,
      isHTML5: true,
      removeAfterUpload: true,
      autoUpload: false,
      allowedFileType: ['image'],
      maxFileSize: 10 * 1024 * 1024
      
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; }

    this.uploader.onBuildItemForm = (fileItem : any, form : any) => 
    {
      form.append('PropertyName',localStorage.getItem("PropertyName"))
      //form.append('Image', fileItem)
    }
    
    this.uploader.uploadAll();
  }

}
