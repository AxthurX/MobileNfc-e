import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Util } from 'src/app/core/util.model';
import { OperacaoComprovanteJson } from '../../../../../core/operacao-comprovante.model';
import { ModalController, NavParams } from '@ionic/angular';
import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator/ngx';
import { OverlayService } from 'src/app/core/service/overlay.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-detalhe-comprovante',
  templateUrl: './detalhe-comprovante.component.html',
  styleUrls: ['./detalhe-comprovante.component.scss'],
})
export class DetalheComprovanteComponent  implements OnInit, OnDestroy
{
  @ViewChild('imprimir') imprimir: ElementRef;
  objBalanco: OperacaoComprovanteJson;
  gerando: boolean;
  base64: string;
  constructor(
    private nav: NavParams,
    private modal: ModalController,
    private pdf: PDFGenerator,
    private overlay: OverlayService,
    auth: AuthService
  ) {
    this.gerando = false;
  }

  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    this.modal.dismiss();
  }

  ngOnInit() {
    try {
      const modalState = {
        modal: true,
        desc: 'fake state for our modal',
      };
      /* history.pushState(modalState, null); */
      this.downloadPdf();
    } catch (e) {
      Util.TratarErro(e);
    }
  }

  ngOnDestroy() {
    if (window.history.state.modal) {
      history.back();
    }
  }

  downloadPdf() {
    setTimeout(() => {
      try {
        this.gerando = true;
        const content = document.getElementById('imprimir')?.innerHTML;
        const options = {
          documentSize: 'A4',
          type: 'share',
          // landscape: 'portrait',
          fileName: 'venda.pdf',
        };
        this.pdf
          .fromData(
            `<html>
          <head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
          </head>
          <body>
            ${content}
          </body>
          </html>`,
            options
          )
          .then((base64: any) => {
            console.log(base64);
            this.limparDadosGerando();
            this.overlay.dismissLoadCtrl();
            this.gerando = false;
            this.modal.dismiss();
          })
          .catch((e: any) => {
            this.overlay.dismissLoadCtrl();
            Util.TratarErro(e);
            this.limparDadosGerando();
            this.gerando = false;
          });
      } catch (e) {
        Util.TratarErro(e);
        this.limparDadosGerando();
        this.gerando = false;
      }
    }, 500);
  }

  limparDadosGerando() {
    this.gerando = false;
    this.base64 = '';
  }
}
