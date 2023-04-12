import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavParams } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BtnVoltarComponent } from './components/btn-voltar.component';
import { CabecalhoComprovanteComponent } from './components/cabecalho-comprovante/cabecalho-comprovante.component';

@NgModule({
  declarations: [BtnVoltarComponent, CabecalhoComprovanteComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],

  exports: [
    BtnVoltarComponent,
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule,
    BtnVoltarComponent,
    CabecalhoComprovanteComponent,
  ],
  providers: [NavParams],
})
export class SharedModule {}
