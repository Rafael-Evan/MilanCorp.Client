import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpEventType, HttpEvent, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FileUpload } from '../_models/FileUpload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  files: File;

  private baseUrl = `${environment.apiUrl}material`;
  private baseUpload = `${environment.apiUrl}upload`;

  constructor(private http: HttpClient) { }

  CadastrarMaterial(model: any) {
    return this.http
      .post(`${this.baseUrl}/cadastrarMaterial`, model);
  }

  ListarMateriais() {
    return this.http.get(`${this.baseUrl}`);
  }

  postFile(fileToUpload: Array<FileUpload>, NomeDaPasta: any) {
    const formData: FormData = new FormData();
    formData.append('Materiais', NomeDaPasta);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < fileToUpload.length; i++) {
      formData.append('fileKey', fileToUpload[i], fileToUpload[i].input);
    }
    return this.http.post(this.baseUpload, formData, NomeDaPasta);
  }

}
