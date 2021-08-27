import { NgModule } from '@angular/core';
import { NovoNotaComponent } from './novo-nota.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MensagemModule } from '../../componentes/mensagem/mensagem.module';
import { RouterModule } from '@angular/router';
import { PhotoModule } from '../photo/photo.module';
import { ImmediateClickModule } from '../../shared/directives/immediate-click/immediate-click.module';

@NgModule({
    declarations: [NovoNotaComponent],
    imports: [ 
        CommonModule,
        ReactiveFormsModule,
        MensagemModule,
        FormsModule,
        RouterModule,
        PhotoModule,
        ImmediateClickModule
    ]
})
export class PhotoFormModule { }