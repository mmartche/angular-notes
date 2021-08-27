import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheNotaComponent } from './detalhe-nota/detalhe-nota.component';
import { ListaNotasComponent } from './lista-notas/lista-notas.component';
import { ListaNotasResolver } from './lista-notas/lista-notas.resolver';
import { NovoNotaComponent } from './novo-nota/novo-nota.component';

const routes: Routes = [
  {
    path: '',
    component: ListaNotasComponent,
    resolve: {
      notas: ListaNotasResolver,
    },
  },
  {
    path: 'novo',
    component: NovoNotaComponent,
  },
  {
    path: ':notaId',
    component: DetalheNotaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotasRoutingModule {}
