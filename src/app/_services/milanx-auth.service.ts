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
    return this.http.post(`${this.baseUrl}/login`, model).pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            sessionStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            sessionStorage.setItem('username', model.username);
          }
        })
      );
  }

  GetUsers() {
    return this.http.get(`${this.baseUrl}/ListarTodosUsuarios`);
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
    return this.http.post(`${this.baseUrl}/`, body, {headers});
  }

  listarUsuarioPorId(id: any) {
    return this.http.get(`${this.baseUrl}?Id=` + id);
  }

  loggedIn() {
    const token = sessionStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
