import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/shared.module';
import { RouterModule } from '@angular/router';
import { ModaisComponent } from './modais.component';

@NgModule({
  declarations: [ModaisComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ModaisComponent,
      },
    ]),
  ],
})
export class ModaisModule {}
