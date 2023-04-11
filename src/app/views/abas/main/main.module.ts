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
            path: 'comprovante',
            loadChildren: () =>
              import('../main/comprovante/comprovante.module').then(
                (m) => m.ComprovanteModule
              ),
          },
        ],
      },
    ]),
  ],
})
export class MainModule {}
