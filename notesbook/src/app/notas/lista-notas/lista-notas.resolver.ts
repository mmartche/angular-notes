import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { Notas } from '../notas';
import { NotasService } from '../notas.service';

@Injectable({
  providedIn: 'root',
})
export class ListaNotasResolver implements Resolve<Notas> {
  constructor(
    private notasService: NotasService,
    private usuarioService: UsuarioService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Notas> {
    return this.usuarioService.retornaUsuario().pipe(
      switchMap((usuario) => {
        const userName = usuario.name ?? '';
        return this.notasService.listaDoUsuario(userName);
      }),
      take(1)
    );
  }
}
