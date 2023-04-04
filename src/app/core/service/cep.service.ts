import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  constructor(private http: HttpClient) { }

  consultaCEP(cep: string): Observable<RetornoEndereco> {
    cep = cep.replace('-', '');
    return this.http.get<RetornoEndereco>(
      `https://viacep.com.br/ws/${cep}/json`
    );
  }
}

export class RetornoEndereco {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  //auxiliar
  erro: boolean;
}
