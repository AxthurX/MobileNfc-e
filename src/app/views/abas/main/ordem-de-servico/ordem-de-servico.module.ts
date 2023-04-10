import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdemDeServicoComponent } from './ordem-de-servico.component';
import { SharedModule } from 'src/app/core/shared.module';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [OrdemDeServicoComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxMaskModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: OrdemDeServicoComponent,
      },
    ]),
  ],
})
export class OrdemDeServicoModule {}
