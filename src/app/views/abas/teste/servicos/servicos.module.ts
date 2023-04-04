import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicosComponent } from './servicos.component';
import { SharedModule } from 'src/app/core/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ServicosComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ServicosComponent
      }
    ])
  ]
})
export class ServicosModule { }
