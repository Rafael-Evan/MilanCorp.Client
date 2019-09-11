import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { MaterialService } from '../_services/material.service';

const URL = `${environment.apiUrl}upload`;

@Component({
  selector: 'app-fileup',
  templateUrl: './fileup.component.html',
  styleUrls: ['./fileup.component.css']
})
export class FileupComponent implements OnInit {
  fileToUpload: File = null;

//   handleFileInput(files: FileList) {
//     this.fileToUpload = files.item(0);
// }

// uploadFileToActivity() {
//   this.authService.postFile(this.fileToUpload).subscribe(data => {
//     // do something, if upload success
//     }, error => {
//       console.log(error);
//     });
// }

  constructor(private toastr: ToastrService,
    private authService: MaterialService) { }

  ngOnInit() {
  }

}
