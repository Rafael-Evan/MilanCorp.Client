import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MilanxAuthService {

  private baseUrl = `${environment.apiUrl}user`;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http
      .post(`${this.baseUrl}/login`, model).pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            sessionStorage.setItem('username', model.username);
          }
        })
      );
  }

  getNomeCompleto(id: number) {
    return this.http.get(`${this.baseUrl}/FullName/` + id);
  }

  listarUsuarioPeloUserName(userName: any) {
    let headers = new HttpHeaders();
    const body = JSON.stringify({UserName: userName});
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(`${this.baseUrl}/VerificarAcessos`, body, {headers});
  }

  listarIdDoUsuario(userName: any) {
    let headers = new HttpHeaders();
    const body = JSON.stringify({UserName: userName});
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(`${this.baseUrl}/Id`, body, {headers});
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
