import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpEventType, HttpEvent, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComitenteService {

  private baseUrl = `${environment.apiUrl}Mlcomitentes`;

  constructor(private http: HttpClient) { }

    // GET
    ListarComitentes(): any {
        return this.http.get<any>(`${this.baseUrl}`)
        .pipe(
          retry(1),
          catchError(this.errorHandl)
        )
      }
    errorHandl(errorHandl: any): import("rxjs").OperatorFunction<any, any> {
        throw new Error('Erro ao listar os comitentes.');
    }

}
