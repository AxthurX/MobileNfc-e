import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagamentosComponent } from './pagamentos.component';
import { SharedModule } from '../../../../core/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PagamentosComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: PagamentosComponent
      }
    ])
  ]
})
export class PagamentosModule { }
