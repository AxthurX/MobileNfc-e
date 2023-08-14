import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/core/shared.module';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator/ngx';
import { OrcamentoComponent } from '../orcamento/orcamento.component';
import { TelaOrcamentoComponent } from './tela-orcamento/tela-orcamento.component';
import { DetalheOrcamentoComponent } from './detalhe-orcamento/detalhe-orcamento.component';

@NgModule({
  declarations: [
    OrcamentoComponent,
    TelaOrcamentoComponent,
    DetalheOrcamentoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxMaskModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: OrcamentoComponent,
      },
      {
        path: 'tela-orcamento',
        component: TelaOrcamentoComponent,
      },
      {
        path: 'detalhe-orcamento',
        component: DetalheOrcamentoComponent,
      },
    ]),
  ],
  providers: [PDFGenerator],
})
export class OrcamentoModule {}
