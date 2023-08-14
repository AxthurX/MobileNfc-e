import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/core/shared.module';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ComprovanteComponent } from './comprovante.component';
import { TelaComprovanteComponent } from './tela-comprovante/tela-comprovante.component';
import { DetalheComprovanteComponent } from './detalhe-comprovante/detalhe-comprovante.component';
import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator/ngx';
import { OrcamentoComponent } from './orcamento/orcamento.component';

@NgModule({
  declarations: [
    ComprovanteComponent,
    TelaComprovanteComponent,
    DetalheComprovanteComponent,
    OrcamentoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxMaskModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: ComprovanteComponent,
      },
      {
        path: 'tela-comprovante',
        component: TelaComprovanteComponent,
      },
      {
        path: 'detalhe-comprovante',
        component: DetalheComprovanteComponent,
      },
      {
        path: 'orcamento',
        component: OrcamentoComponent,
      },
    ]),
  ],
  providers: [PDFGenerator],
})
export class ComprovanteModule {}
