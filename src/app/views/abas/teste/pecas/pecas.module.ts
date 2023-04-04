import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PecasComponent } from './pecas.component';
import { SharedModule } from 'src/app/core/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PecasComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: PecasComponent
      }
    ])
  ]
})
export class PecasModule { }
