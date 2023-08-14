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
      },
    ]),
  ],
})
export class MainModule {}
