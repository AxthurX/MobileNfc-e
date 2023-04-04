import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdemDeServicoComponent } from './ordem-de-servico.component';
import { SharedModule } from 'src/app/core/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OrdemDeServicoComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrdemDeServicoComponent
      }
    ])
  ]
})
export class OrdemDeServicoModule { }
