import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacaoGuard } from './autenticacao/autenticacao.guard';
import { LoginGuard } from './autenticacao/login.guard';
import { GlobalErrorComponent } from './errors/global-error/global-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canLoad: [LoginGuard],
  },
  {
    path: 'notas',
    loadChildren: () =>
      import('./notas/notas.module').then((m) => m.NotasModule),
    canLoad: [AutenticacaoGuard],
  },
  { 
      path: 'error', 
      component: GlobalErrorComponent,
      data: {
          title: 'Error'
      }
  },
  { 
      path: 'not-found', 
      component: NotFoundComponent,
      data: {
          title: 'Not found'
      }
  },
  {
      path: '**', 
      redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
