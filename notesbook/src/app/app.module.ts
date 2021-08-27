import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CabecalhoModule } from './componentes/cabecalho/cabecalho.module';
import { RodapeModule } from './componentes/rodape/rodape.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { ErrorsModule } from './errors/errors.module';
import { LoadingModule } from './componentes/loading/loading.module';
import { AlertModule } from './componentes/alert/alert.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CabecalhoModule,
    RodapeModule,
    AutenticacaoModule,
    ErrorsModule,
    LoadingModule,
    AlertModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
