/* eslint-disable @typescript-eslint/member-ordering */
import Swal from 'sweetalert2';
import { SweetAlertInput } from 'sweetalert2';
import { SweetAlertIcon } from 'sweetalert2';
import { OverlayService } from './service/overlay.service';
/* eslint-disable @typescript-eslint/naming-convention */

export type PredefinedColorsCardNumber =
  | 'success'
  | 'info'
  | 'danger'
  | 'warning';

export class Util {
  static confirm(pergunta: string, confirmou: () => void) {
    Swal.fire({
      heightAuto: false,
      title: '<strong>Confirma esta ação?</strong>',
      icon: 'question',
      html: pergunta,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<ion-icon name="thumbs-up"></ion-icon> Sim',
      cancelButtonText: '<ion-icon name="thumbs-down"></ion-icon> Não',
    }).then((result) => {
      if (result.value) {
        confirmou();
      }
    });
  }

  setFocusDocumento() {
    try {
      setTimeout(() => {
        const input = document.getElementsByClassName('swal2-input');
        console.log(input);
      }, 500);
    } catch (e) {
      console.error('setFocusDocumento', e);
    }
  }

  static async EspecificarTexto(
    title: string,
    inputPlaceholder: string,
    digitou: (data: any) => void,
    textoSalvo?: string,
    input?: SweetAlertInput
  ) {
    if (!textoSalvo) {
      textoSalvo = '';
    }

    if (!input) {
      input = 'textarea';
    }
    const { value: text } = await Swal.fire({
      title,
      input,
      inputPlaceholder,
      inputValue: textoSalvo,
      showCancelButton: true,
      heightAuto: false,
      didOpen: () => {},
    });
    if (text) {
      textoSalvo = text.toString();
      return digitou(text.toString().toUpperCase());
    }
  }

  static TratarErroEFecharLoading(e: any, overlay: OverlayService) {
    Util.AlertErrorPadrao();
    console.log(e);
    overlay.dismissLoadCtrl();
  }

  static TratarErro(e: any) {
    Util.AlertErrorPadrao();
    console.error(e);
  }

  static AlertError(mensagem: string) {
    this.Alert('Ops...', mensagem, 'error');
  }
  static AlertSucess(mensagem: string) {
    this.Alert('OK', mensagem, 'success');
  }
  static AlertErrorPadrao() {
    this.Alert('Ops...', 'Algo deu errado, tente novamente', 'error');
  }
  static AlertErrorStatus(status: number) {
    this.Alert(
      'Ops...',
      'Ocorreu algum erro, tente novamente, cód do erro: ' + status,
      'error'
    );
  }
  static AlertWarning(mensagem: string) {
    this.Alert('Atenção!', mensagem, 'warning');
  }
  static AlertInfo(mensagem: string) {
    this.Alert('', mensagem, 'info');
  }

  static Alert(title?: string, html?: string, icon?: SweetAlertIcon) {
    Swal.fire({
      title,
      html,
      icon,
      heightAuto: false,
    });
  }

  static Notificacao(
    title: string,
    icon: SweetAlertIcon,
    timer: number = 3000
  ) {
    Swal.fire({
      heightAuto: false,
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer,
      title,
      icon,
    });
  }

  static GetFormasPagamentos() {
    return [
      {
        tipo: 'boleto',
        id: 0,
      },
      {
        tipo: 'transferencia bancaria',
        id: 1,
      },
      {
        tipo: 'cartão de credito',
        id: 2,
      },
      {
        tipo: 'cartão de debito',
        id: 3,
      },
      {
        tipo: 'pix',
        id: 4,
      },
    ];
  }
}
