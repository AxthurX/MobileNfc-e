import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/shared.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [
    SharedModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainComponent,
        children: [
          {
            path: 'fotos',
            loadChildren: () =>
              import('../modais/fotos/fotos.module').then((m) => m.FotosModule),
          },
          {
            path: 'cabecalho',
            loadChildren: () =>
              import('../main/cabecalho/cabecalho.module').then(
                (m) => m.CabecalhoModule
              ),
          },
          {
            path: 'ordem-de-servico',
            loadChildren: () =>
              import('../main/ordem-de-servico/ordem-de-servico.module').then(
                (m) => m.OrdemDeServicoModule
              ),
          },
        ],
      },
    ]),
  ],
})
export class TesteModule {}
