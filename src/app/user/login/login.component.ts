import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  email: any;


  constructor() { }

  ngOnInit() {
  }

    // Method to sign in with facebook.
    signIn(platform: string): void {
    }


  login() {
  }

  // Method to log out.
  signOut(): void {
  }

}
