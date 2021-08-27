import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotasRoutingModule } from './notas-routing.module';
import { ListaNotasComponent } from './lista-notas/lista-notas.component';
import { NotaComponent } from './nota/nota.component';
import { CartaoModule } from '../componentes/cartao/cartao.module';
import { GradeFotosNotasComponent } from './grade-fotos-notas/grade-fotos-notas.component';
import { DetalheNotaComponent } from './detalhe-nota/detalhe-nota.component';
import { ComentariosComponent } from './detalhe-nota/comentarios/comentarios.component';
import { MensagemModule } from '../componentes/mensagem/mensagem.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NovoNotaComponent } from './novo-nota/novo-nota.component';

@NgModule({
  declarations: [
    ListaNotasComponent,
    NotaComponent,
    GradeFotosNotasComponent,
    DetalheNotaComponent,
    ComentariosComponent,
    NovoNotaComponent,
  ],
  imports: [CommonModule, NotasRoutingModule, CartaoModule, SharedModule],
})
export class NotasModule {}
