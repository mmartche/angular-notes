import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './cabecalho.component';
import { RouterModule } from '@angular/router';
import { MenuModule } from '../menu/menu.module';
import { LoadingModule } from '../../componentes/loading/loading.module';
import { AlertModule } from '../../componentes/alert/alert.module';

@NgModule({
  declarations: [CabecalhoComponent],
  imports: [CommonModule, RouterModule, MenuModule, LoadingModule, AlertModule],
  exports: [CabecalhoComponent],
})
export class CabecalhoModule {}
