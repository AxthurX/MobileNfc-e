import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { SharedModule } from '../../../core/shared.module';
import { AppVersion } from '@ionic-native/app-version/ngx';

@NgModule({
  declarations: [InicioComponent],
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
  providers: [AppVersion],
})
export class InicioModule {}
