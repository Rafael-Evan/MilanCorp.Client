import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  file: File;
  
  private baseUrl = `${environment.apiUrl}material`;

  constructor(private http: HttpClient) { }

  CadastrarMaterial(model: any) {
    return this.http
      .post(`${this.baseUrl}/cadastrarMaterial`, model);
  }

  postUpload(files) {
    if (files.length === 0) {
      return;
    }

    const formData: FormData = new FormData();
    formData.append('file', files[0], files[0].name);
    return this.http.post(`${environment.apiUrl}/upload`, formData);

    // return this.http.post(`${environment.apiUrl}/upload`, formData, { reportProgress: true, observe: 'events' });
  }

  // postUpload(files: File) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   const options = {
  //     headers: headers
  //   };

  //   return this.http.post(`${this.baseUrl}/upload`, {options, files});
  // }

}
