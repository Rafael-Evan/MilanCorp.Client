import { Component, OnInit } from '@angular/core';
import { MilanxAuthService } from 'src/app/_services/milanx-auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any;
  model: any = {};
  email: any;


  constructor(private authService: MilanxAuthService
    , public router: Router
    , private toastr: ToastrService) { }

  ngOnInit() {
    if (sessionStorage.getItem('token') !== null) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    if (this.model.username != null || this.model.password != null) {
      this.authService.login(this.model)
        .subscribe(
          () => {
            this.router.navigate(['/home']);
          },
          error => {
            this.toastr.error('Falha ao tentar Logar');
          }
        );
    }
  }

  // Method to log out.
  signOut(): void {
    this.user = null;
    console.log('User signed out.');
  }
}
