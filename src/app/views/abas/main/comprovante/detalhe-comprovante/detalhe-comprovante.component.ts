import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Util } from 'src/app/core/util.model';
import { ModalController } from '@ionic/angular';
import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator/ngx';
import { OverlayService } from 'src/app/core/service/overlay.service';
import { Comprovante } from '../comprovante.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-detalhe-comprovante',
  templateUrl: './detalhe-comprovante.component.html',
  styleUrls: ['./detalhe-comprovante.component.scss'],
})
export class DetalheComprovanteComponent implements OnInit, OnDestroy {
  @ViewChild('imprimir') imprimir: ElementRef;
  comprovante: Comprovante;
  comprovantes: Comprovante[] = [];
  gerando: boolean;
  base64: string;
  date_now: string;
  soma: number;
  ano: number;

  constructor(
    private modal: ModalController,
    private pdf: PDFGenerator,
    private overlay: OverlayService
  ) {
    this.gerando = false;
  }

  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    this.modal.dismiss();
  }

  ngOnInit() {
    try {
      const data = new Date();
      this.ano = data.getFullYear();
      this.soma = this.comprovante.pecas.reduce(
        (acc, item) => acc + item.preco_unitario * item.quantidade,
        0
      );

      this.date_now = formatDate(new Date(), 'dd/MM/yyyy', 'pt-BR');
      const modalState = {
        modal: true,
        desc: 'fake state for our modal',
      };
      history.pushState(modalState, null);

      setTimeout(() => {
        this.downloadPdf();
      }, 200);
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
    this.comprovantes.push(this.comprovante);
    setTimeout(() => {
      try {
        this.gerando = true;
        const content = document.getElementById('imprimir')?.innerHTML;
        const options = {
          documentSize: 'A4',
          type: 'share',
          // landscape: 'portrait',
          fileName: 'comprovante.pdf',
        };
        this.pdf
          .fromData(
            `<html>
            <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"
            </head>
            <body>
              ${content}
            </body>
          </html>`,
            options
          )
          .then((base64: any) => {
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
