import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavParams } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BtnVoltarComponent } from './components/btn-voltar.component';
import { CabecalhoComprovanteComponent } from './components/cabecalho-comprovante/cabecalho-comprovante.component';
import { BtnSairComponent } from './components/btn-sair.component';

@NgModule({
  declarations: [BtnVoltarComponent, BtnSairComponent,CabecalhoComprovanteComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
  exports: [
    BtnVoltarComponent,
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule,
    BtnVoltarComponent,
    BtnSairComponent,
    CabecalhoComprovanteComponent,
  ],
  providers: [NavParams],
})
export class SharedModule {}
