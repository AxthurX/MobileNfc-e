import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavParams } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BtnVoltarComponent } from './components/btn-voltar.component';
import { CabecalhoComponent } from '../views/abas/main/cabecalho/cabecalho.component';


@NgModule({
  declarations: [BtnVoltarComponent, CabecalhoComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],

  exports: [
    BtnVoltarComponent,
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule,
    BtnVoltarComponent,
    CabecalhoComponent,
  ],
  providers: [NavParams],
})
export class SharedModule {}
