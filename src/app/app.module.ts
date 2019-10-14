import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { EventoComponent } from './evento/evento.component';
import { DetalhesDaVendaComponent } from './vendas/materiais/detalhes-da-venda/detalhes-da-venda.component';
import { AniversarianteComponent } from './aniversariante/aniversariante.component';
import { SalaDeReuniaoComponent } from './sala-de-reuniao/sala-de-reuniao.component';
import { ClimaTempoComponent } from './clima-tempo/clima-tempo.component';
import { FahrenheitPipe } from './fahrenheit.pipe';
import { MomentPipe } from './moment.pipe';

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
      VendasMenuComponent,
      EventoComponent,
      DetalhesDaVendaComponent,
      AniversarianteComponent,
      SalaDeReuniaoComponent,
      ClimaTempoComponent,
      FahrenheitPipe,
      MomentPipe,
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      ToastrModule.forRoot({
         timeOut: 3000,
      }),
      AppRoutingModule,
      HttpClientModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
