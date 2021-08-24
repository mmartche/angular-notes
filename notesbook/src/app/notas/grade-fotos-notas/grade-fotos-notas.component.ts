import { Component, Input, OnInit } from '@angular/core';
import { Notas } from '../notas';

@Component({
  selector: 'app-grade-fotos-notas',
  templateUrl: './grade-fotos-notas.component.html',
  styleUrls: ['./grade-fotos-notas.component.css'],
})
export class GradeFotosNotasComponent implements OnInit {
  @Input() notas!: Notas;

  constructor() {}

  ngOnInit(): void {}
}
