import { formatDate } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnChanges,
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
import { Orcamento } from '../orcamento.model';

@Component({
  selector: 'app-detalhe-orcamento',
  templateUrl: './detalhe-orcamento.component.html',
  styleUrls: ['./detalhe-orcamento.component.scss'],
})
export class DetalheOrcamentoComponent implements OnInit, OnChanges {
  @ViewChild('imprimir') imprimir: ElementRef;
  orcamento: Orcamento;
  orcamentos: Orcamento[] = [];
  date_now: string;
  gerando: boolean;

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
      this.date_now = formatDate(new Date(), 'dd/MM/yyyy', 'pt-BR');
      this.mudarValorOrçamento();
      setTimeout(() => {
        this.downloadPdf();
      }, 200);
    } catch (e) {
      Util.TratarErro(e);
    }
  }

  ngOnChanges() {
    this.mudarValorOrçamento();
  }

  ngOnDestroy() {
    if (window.history.state.modal) {
      history.back();
    }
  }

  async mudarValorOrçamento() {
    try {
      this.orcamento.total_geral = this.orcamento.servico.reduce(
        (acc, item) => acc + item.valor_unitario * item.quantidade,
        0
      );
    } catch (e) {
      Util.TratarErro(e);
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
          fileName: 'orçamento.pdf',
        };
        this.pdf
          .fromData(
            `<html>
            <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.2.2/font/bootstrap-icons.css" rel="stylesheet">
            </head>
            <body>
              ${content}
            </body>
          </html>`,
            options
          )
          .then(() => {
            this.gerando = false;
            this.overlay.dismissLoadCtrl();
            this.modal.dismiss();
          })
          .catch((e: any) => {
            this.gerando = false;
            this.overlay.dismissLoadCtrl();
            Util.TratarErro(e);
          });
      } catch (e) {
        this.gerando = false;
        Util.TratarErro(e);
      }
    }, 500);
  }
}
