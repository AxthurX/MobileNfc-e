import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AbasComponent } from './abas.component';
import { SharedModule } from '../../core/shared.module';

@NgModule({
  declarations: [AbasComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: AbasComponent,
      children: [{
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
          path: 'modais',
          loadChildren: () =>
            import('./modais/modais.module').then((m) => m.ModaisModule),
        },
        {
          path: 'main',
          loadChildren: () =>
            import('./main/main.module').then((m) => m.MainModule),
        },
        {
          path: 'comprovante',
          loadChildren: () =>
            import('./main/comprovante/comprovante.module').then((m) => m.ComprovanteModule),
        },
      ],
    }, ]),
  ],
})
export class AbasModule {}
