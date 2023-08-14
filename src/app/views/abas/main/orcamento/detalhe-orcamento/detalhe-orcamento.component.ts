import { formatDate } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  PDFGenerator,
  PDFGeneratorOptions,
} from '@awesome-cordova-plugins/pdf-generator/ngx';
import { ModalController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/service/overlay.service';
import { Util } from 'src/app/core/util.model';

@Component({
  selector: 'app-detalhe-orcamento',
  templateUrl: './detalhe-orcamento.component.html',
  styleUrls: ['./detalhe-orcamento.component.scss'],
})
export class DetalheOrcamentoComponent implements OnInit {
  @ViewChild('imprimir') imprimir: ElementRef;
  date_now: string;
  gerando: boolean;
  base64: string;

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
      this.date_now = formatDate(new Date(), 'dd/MM/yyyy', 'pt-BR');

      // setTimeout(() => {
      //   this.downloadPdf();
      // }, 200);
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
        const options: PDFGeneratorOptions = {
          documentSize: 'A4',
          type: 'share',
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
