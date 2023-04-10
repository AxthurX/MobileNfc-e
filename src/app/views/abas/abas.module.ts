import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AbasComponent } from './abas.component';
import { SharedModule } from '../../core/shared.module';

@NgModule({
  declarations: [AbasComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AbasComponent,
        children: [
          {
            path: '',
            redirectTo: 'inicio',
            pathMatch: 'full',
          },
          {
            path: 'inicio',
            loadChildren: () =>
              import('./inicio/inicio.module').then((m) => m.InicioModule),
          },
          {
            path: 'fotos',
            loadChildren: () =>
              import('./modais/fotos/fotos.module').then((m) => m.FotosModule),
          },
          {
            path: 'modais',
            loadChildren: () =>
              import('./modais/modais.module').then((m) => m.ModaisModule),
          },
          {
            path: 'teste',
            loadChildren: () =>
              import('./teste/teste.module').then((m) => m.TesteModule),
          },
          {
            path: 'ordem-de-servico',
            loadChildren: () =>
              import('./teste/ordem-de-servico/ordem-de-servico.module').then((m) => m.OrdemDeServicoModule),
          },
        ],
      },
    ]),
  ],
})
export class AbasModule {}
