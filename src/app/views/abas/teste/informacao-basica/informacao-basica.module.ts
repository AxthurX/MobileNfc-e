import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformacaoBasicaComponent } from './informacao-basica.component';
import { SharedModule } from 'src/app/core/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [InformacaoBasicaComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: InformacaoBasicaComponent
      }
    ])
  ]
})
export class InformacaoBasicaModule { }
