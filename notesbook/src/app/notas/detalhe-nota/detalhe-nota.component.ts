import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Nota } from '../notas';
import { NotasService } from '../notas.service';

@Component({
  selector: 'app-detalhe-nota',
  templateUrl: './detalhe-nota.component.html',
  styleUrls: ['./detalhe-nota.component.css'],
})
export class DetalheNotaComponent implements OnInit {
  notaId!: number;
  nota$!: Observable<Nota>;

  constructor(
    private notasService: NotasService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.notaId = this.activatedRoute.snapshot.params.notaId;
    this.nota$ = this.notasService.buscaPorID(this.notaId);
  }

  curtir() {
    this.notasService.curtir(this.notaId).subscribe((curtida) => {
      if (curtida) {
        this.nota$ = this.notasService.buscaPorID(this.notaId);
      }
    });
  }

  excluir() {
    this.notasService.excluiNota(this.notaId).subscribe(
      () => {
        this.router.navigate(['/notas/']);
      },
      (error) => console.log(error)
    );
  }
}
