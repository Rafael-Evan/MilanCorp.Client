import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpEventType, HttpEvent, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FileUpload } from '../_models/FileUpload';
declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class AniversarianteService {

    aniversariantes: any;

    private baseUrl = `${environment.apiUrl}aniversariante`;

    constructor(private http: HttpClient) { }

    ImportarAniversariantes(fileToUpload: File) {
        const formData: FormData = new FormData();
        formData.append('fileKey', fileToUpload, fileToUpload.name);
        return this.http
            .post(this.baseUrl + '/ImportarAniversariantes', formData);
    }

    CadastrarAniversariante(model: any) {
        return this.http
            .post(`${this.baseUrl}/cadastrarAniversariante`, model);
    }

}
