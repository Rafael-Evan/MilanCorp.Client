import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { VendasComponent } from './vendas/vendas.component';
import { AutomovelComponent } from './vendas/automovel/automovel.component';
import { ImoveisComponent } from './vendas/imoveis/imoveis.component';
import { MateriaisComponent } from './vendas/materiais/materiais.component';
import { VendasMenuComponent } from './vendas/vendas-menu/vendas-menu.component';

@NgModule({
   declarations: [
      AppComponent,
      UserComponent,
      LoginComponent,
      NavComponent,
      HomeComponent,
      VendasComponent,
      AutomovelComponent,
      ImoveisComponent,
      MateriaisComponent,
      VendasMenuComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      AppRoutingModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
