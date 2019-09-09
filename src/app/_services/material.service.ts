import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  baseUrl = 'https://localhost:44361/api/material/';

  constructor(private http: HttpClient) { }

  CadastrarMaterial(model: any) {
    return this.http
      .post(`${this.baseUrl}cadastrarMaterial`, model);
  }

  postUpload(files: Array<File>) {
    return this.http.post(`${this.baseUrl}upload`, files);
  }

}
