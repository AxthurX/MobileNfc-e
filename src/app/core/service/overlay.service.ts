import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AlertOptions, ToastOptions } from '@ionic/core';
export type PredefinedColors = |
  'primary' |
  'secondary' |
  'tertiary' |
  'success' |
  'warning' |
  'danger' |
  'light' |
  'medium' |
  'dark';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  dismissLoadCtrl() {
    setTimeout(() => {
      this.loadingCtrl
        .getTop()
        .then((v) => (v ? this.loadingCtrl.dismiss() : null));
    }, 1000);
  }

  async alert(options ? : AlertOptions) {
    const alert = await this.alertCtrl.create(options);
    await alert.present();
  }

  showLoadingConsultando() {
    this.showLoading('Consultando...');
  }
  showLoading(message ? : string) {
    if (!message) {
      message = 'Carregando...';
    }
    this.loading(message);
  }
  private async loading(message: string) {
    const loading = await this.loadingCtrl.create({
      message,
      mode: 'ios',
    });
    await loading.present();
  }

  notificarSucesso(mensagem: string) {
    this.showToast(mensagem, 'success');
  }

  notificarErro(mensagem: string) {
    this.showToast(mensagem, 'danger');
  }

  notificarAlerta(mensagem: string) {
    this.showToast(mensagem, 'warning');
  }

  showToast(message: string, color: PredefinedColors) {
    this.toast({
      message,
      color,
      duration: 3000,
    });
  }

  notificarErroPadrao(
    e,
    mensagem: string = 'Ops, algo deu errado, tente novamente'
  ) {
    this.showToast(mensagem, 'danger');
  }

  private async toast(options ? : ToastOptions) {
    const toast = await this.toastCtrl.create({
      position: 'bottom',
      duration: 3000,
      buttons: [{
        text: 'Ok',
        role: 'cancel',
      }, ],
      ...options,
    });
    await toast.present();
  }
}
