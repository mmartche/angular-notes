import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { NotasService } from '../notas.service';

@Component({
  selector: 'app-novo-nota',
  templateUrl: './novo-nota.component.html',
  styleUrls: ['./novo-nota.component.css'],
})
export class NovoNotaComponent implements OnInit {
  formularioNota!: FormGroup;
  file!: File;
  preview!: string;
  percentualConcluido = 0;

  constructor(
    private notasService: NotasService,
    private formbuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formularioNota = this.formbuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true],
    });
  }

  upload() {
    const allowComments =
      this.formularioNota.get('allowComments')?.value ?? false;
    const description = this.formularioNota.get('description')?.value ?? '';

    this.notasService
      .upload(description, allowComments, this.file)
      .pipe(finalize(() => this.router.navigate(['notas'])))
      .subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            const total = event.total ?? 1;
            this.percentualConcluido = Math.round(100 * (event.loaded / total));
          }
        },
        (error) => console.log(error)
      );
  }

  gravaArquivo(arquivo: any): void {
    const [file] = arquivo?.files;
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => (this.preview = event.target.result);
    reader.readAsDataURL(file);
  }
}
