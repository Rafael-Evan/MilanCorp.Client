import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  },
  { path: 'home', component: HomeComponent },
  // { path: '', redirectTo: 'user/login', pathMatch: 'full' },
  // { path: '**', redirectTo: 'user/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
