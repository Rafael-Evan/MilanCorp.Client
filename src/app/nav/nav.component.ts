import { Component, OnInit } from '@angular/core';
import { MilanxAuthService } from '../_services/milanx-auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user: any;
  jwtHelper = new JwtHelperService();
  usuario: any;
  userRole: any;

  constructor(public authService: MilanxAuthService
    ,         public router: Router
    ,         private toastr: ToastrService) { }

  ngOnInit() {

    this.userRole = this.authService.userRole();

    const token = sessionStorage.getItem('token');
    if (token != null) {
      const decodeToken = this.jwtHelper.decodeToken(token);
      this.authService.listarUsuarioPorId(decodeToken.nameid).subscribe((dados) => {
        this.usuario = dados;
      });
    }
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    sessionStorage.removeItem('token');
    this.toastr.show('Você não está mais logado');
    this.router.navigate(['/user/login']);
  }

  userName() {
    return sessionStorage.getItem('username');
  }

}
