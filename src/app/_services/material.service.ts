import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private baseUrl = `${environment.apiUrl}material`;

  constructor(private http: HttpClient) { }

  CadastrarMaterial(model: any) {
    return this.http
      .post(`${this.baseUrl}/cadastrarMaterial`, model);
  }

  postUpload(files: File) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {
      headers: headers
    };

    return this.http.post(`${this.baseUrl}/upload`, {options, files});
  }

}
