import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl = `${environment.apiUrl}upload`;

  constructor(private http: HttpClient) { }

  ListarUploads() {
    return this.http.get(`${this.baseUrl}`);
  }
}
