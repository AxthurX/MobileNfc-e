import { NgModule } from '@angular/core';
import { TesteComponent } from './teste.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/shared.module';

@NgModule({
  declarations: [TesteComponent],
  imports: [
    SharedModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TesteComponent,
      },
    ]),
  ],
})
export class TesteModule {}
