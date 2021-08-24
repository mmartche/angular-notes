import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenService } from '../autenticacao/token.service';
import { Notas, Nota } from './notas';

const API = environment.apiURL;
const NOT_MODIFIED = '304';

@Injectable({
  providedIn: 'root',
})
export class NotasService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  listaDoUsuario(nomeDoUsuario: string): Observable<Notas> {
    return this.http.get<Notas>(`${API}/${nomeDoUsuario}/notes`);
  }

  buscaTodos(): Observable<Notas> {
    return this.http.get<Notas>(`${API}/notes`);
  }

  buscaPorID(id: number): Observable<Nota> {
    return this.http.get<Nota>(`${API}/notes/${id}`);
  }

  excluiNota(id: number): Observable<Nota> {
    return this.http.delete<Nota>(`${API}/notes/${id}`);
  }

  curtir(id: number): Observable<boolean> {
    return this.http
      .post(`${API}/notes/${id}/like`, {}, { observe: 'response' })
      .pipe(
        mapTo(true),
        catchError((error) => {
          return error.status === NOT_MODIFIED ? of(false) : throwError(error);
        })
      );
  }

  upload(descricao: string, permiteComentario: boolean, arquivo: File) {
    const formData = new FormData();
    formData.append('description', descricao);
    formData.append('allowComments', permiteComentario ? 'true' : 'false');
    formData.append('imageFile', arquivo);

    return this.http.post(`${API}/notes/upload`, formData, {
      observe: 'events',
      reportProgress: true,
    });
  }
}
