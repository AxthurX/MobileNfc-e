import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { SharedModule } from '../../../core/shared.module';

@NgModule({
  imports: [
    IonicModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: InicioComponent,
      },
    ]),
  ],
  declarations: [InicioComponent],
})
export class InicioModule {}
