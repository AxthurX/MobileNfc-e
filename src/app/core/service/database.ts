import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Util } from '../util.model';
import { AuthService } from './auth.service';
import { Comprovante } from 'src/app/views/abas/main/comprovante/comprovante.model';

@Injectable({
  providedIn: 'root',
})

export class DataBaseProvider {
  constructor(private sqlite: SQLite, private auth: AuthService) {}
  //* Cria um banco caso não exista ou pega um banco existente com o nome no parametro

  public getDB() {
    return this.sqlite.create(this.getConfigDb());
  }

  public dropDB() {
    return this.sqlite.deleteDatabase(this.getConfigDb());
  }

  public LimparTabela(
    db: SQLiteObject,
    tabela: string,
    id_empresa?: number
  ): Promise<any> {
    return id_empresa
      ? db.executeSql(
          'delete from ' + tabela + ' where id_empresa = ' + id_empresa,
          []
        )
      : db.executeSql('delete from ' + tabela, []);
  }

  // * Cria a estrutura inicial do banco de dados

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        // Criando as tabelas
        this.createTables(db);
      })
      .catch((e) => console.log(e));
  }

  // public getEtiqueta(pesquisa: string) {
  //   const retorno: Etiqueta[] = [];
  //   return this.getDB()
  //     .then((db: SQLiteObject) => {
  //       const sql = `select * from etiqueta`;

  //       return db
  //         .executeSql(sql, [])
  //         .then((data: any) => {
  //           if (data.rows.length > 0) {
  //             for (let i = 0; i < data.rows.length; i++) {
  //               const registro = data.rows.item(i);
  //               const newItem = new Etiqueta();
  //               newItem.id = +registro.id;
  //               newItem.id_empresa = +registro.id_empresa;
  //               newItem.id_colaborador = +registro.id_colaborador;
  //               newItem.modelo_etiqueta = +registro.modelo_etiqueta;
  //               newItem.utilizar_preco_promocao = Util.AnyToBool(
  //                 registro.utilizar_preco_promocao
  //               );
  //               newItem.nome_modelo_personalizado =
  //                 registro.nome_modelo_personalizado;
  //               newItem.ordenacao_impressao = +registro.ordenacao_impressao;
  //               newItem.carregar_informacoes_nutricionais = Util.AnyToBool(
  //                 registro.carregar_informacoes_nutricionais
  //               );
  //               newItem.id_local_estoque = +registro.id_local_estoque;
  //               newItem.data = +registro.data;
  //               newItem.data_sincronizacao = +registro.data_sincronizacao;
  //               newItem.id_nuvem = +registro.id_nuvem;
  //               newItem.observacao = registro.observacao;

  //               retorno.push(newItem);
  //             }
  //             return retorno;
  //           } else {
  //             return retorno;
  //           }
  //         })
  //         .catch((e) => {
  //           Util.TratarErro(e);

  //           return retorno;
  //         });
  //     })
  //     .catch((e) => {
  //       Util.TratarErro(e);
  //       return [];
  //     });
  // }

  public getNumeroVersaoBanco() {
    const retorno: number = 0;
    return this.getDB()
      .then((db: SQLiteObject) => {
        const sql = 'select max(numero_versao) numero_versao from versao_banco';

        return db
          .executeSql(sql, [])
          .then((data: any) => {
            if (data.rows.length > 0) {
              return +data.rows.item(0).numero_versao;
            } else {
              return retorno;
            }
          })
          .catch((e) => {
            Util.TratarErro(e);

            return retorno;
          });
      })
      .catch((e) => {
        Util.TratarErro(e);
        return [];
      });
  }


  public getEtiquetas() {
    const retorno: Comprovante[] = [];
    return this.getDB()
      .then((db: SQLiteObject) => {
        const sql = 'select * from etiqueta_model order by data desc limit 300';

        return db
          .executeSql(sql, [])
          .then((data: any) => {
            if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                const registro = data.rows.item(i);
                const newItem = new Comprovante();
                newItem.id = +registro.id;

                retorno.push(newItem);
              }
              return retorno;
            } else {
              return retorno;
            }
          })
          .catch((e) => {
            Util.TratarErro(e);

            return retorno;
          });
      })
      .catch((e) => {
        Util.TratarErro(e);
        return [];
      });
  }

  public setAtualizacao(
    db: SQLiteObject,
    registros: AtualizacoesModel[]
  ): Promise<any> {
    const sqlStatements: any[] = [];

    registros.forEach((registro) => {
      sqlStatements.push([
        'insert into versao_banco (numero_versao) values (?)',
        [registro.numero_versao],
      ]);
    });

    return db.sqlBatch(sqlStatements);
  }

  public setEtiqueta(db: SQLiteObject, registros: Comprovante[]): Promise<any> {
    const sqlStatements: any[] = [];

    registros.forEach((registro) => {
      sqlStatements.push([
        'insert into etiqueta (id) values (?)',
        [
          registro.id,
        ],
      ]);
    });

    return db.sqlBatch(sqlStatements);
  }

  public salvarEtiqueta(etiqueta: Comprovante): Promise<any> {
    return this.getDB()
      .then((db: SQLiteObject) => {
        const sqlStatements: any[] = [];

        let comando = '';
        if (etiqueta.id > 0) {
          comando =
            'update etiqueta_model set data = ?, json = ? where id = ' +
            etiqueta.id;
        } else {
          comando = 'insert into etiqueta_model (data, json) values (?, ?)';
        }

        sqlStatements.push([comando, [etiqueta.id]]);

        return db.sqlBatch(sqlStatements);
      })
      .catch((e) => {
        Util.TratarErro(e);
        return null;
      });
  }

  public excluirEtiqueta(id: number): Promise<any> {
    return this.getDB()
      .then((db: SQLiteObject) => {
        const sqlStatements: any[] = [];
        const comando = 'delete from etiqueta_model where id = ?';
        sqlStatements.push([comando, [id]]);
        return db.sqlBatch(sqlStatements);
      })
      .catch((e) => {
        Util.TratarErro(e);
        return null;
      });
  }

  private getConfigDb() {
    return {
      name: 'testeComprovante.db',
      location: 'default',
    };
  }

  /**
   * Criando as tabelas no banco de dados
   */
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
     [
        //Etiqueta
        'CREATE TABLE IF NOT EXISTS etiqueta ([id] [INTEGER] primary key AUTOINCREMENT, [id_empresa] [INTEGER] NOT NULL, [id_colaborador] [INTEGER] NOT NULL, [modelo_etiqueta] [INTEGER] NOT NULL, [utilizar_preco_promocao] [bit] NOT NULL, [nome_modelo_personalizado] [nvarchar](200) NULL, [ordenacao_impressao] [INTEGER] NOT NULL, [carregar_informacoes_nutricionais] [bit] NOT NULL, [id_local_estoque] [INTEGER] NOT NULL, [id_nuvem] [INTERGER] NOT NULL, [data] [INTEGER] NOT NULL, [data_sicronizacao] [INTERGER] NOT NULL, [observacao] [nvarchar](500) NOT NULL)',
      ],
      [
        //usuario
        'CREATE TABLE IF NOT EXISTS usuario ([id] [INTEGER] primary key, [desconto_porcentagem_maximo_permitido] [float] NOT NULL, [id_colaborador] [INTEGER] NOT NULL)',
      ],
    ])
      .then(async () => {
        console.log('Tabelas criadas, consultando atualizações');

        const atualizacoes: AtualizacoesModel[] = [];
        atualizacoes.push(
          {
            numero_versao: 1,
            scripts: [
              'ALTER TABLE cliente ADD COLUMN [limite_credito_disponivel] [float] NOT NULL default 0',
              'ALTER TABLE cliente ADD COLUMN [limite_credito] [float] NOT NULL default 0',
              'ALTER TABLE empresa ADD COLUMN [bloquear_pedidos_a_prazo_cliente_limite_excedido] [bit] NOT NULL default 0',
              'ALTER TABLE empresa ADD COLUMN [consultar_apenas_produto_saldo_maior_zero] [bit] NOT NULL default 0',
              'ALTER TABLE empresa ADD COLUMN [mensagem_bloqueio_venda_limite_credito] [nvarchar](500)',
            ],
          },
          {
            numero_versao: 2,
            scripts: [
              'ALTER TABLE empresa ADD COLUMN [confirmar_alteracao_preco_tela_vendas_ao_alterar_forma_pagamento] [bit] NOT NULL default 0',
            ],
          },
          {
            numero_versao: 3,
            scripts: [
              'ALTER TABLE cliente ADD COLUMN [indicador_ie] [INTEGER] NOT NULL default 9',
              'ALTER TABLE cliente ADD COLUMN [inscricao_estadual] [nvarchar](500)',
            ],
          },
          {
            numero_versao: 4,
            scripts: [
              'ALTER TABLE empresa ADD COLUMN [exibir_preco_atacado_consulta_produto] [bit] NOT NULL default 0',
            ],
          },
          {
            numero_versao: 5,
            scripts: [
              'ALTER TABLE cliente_contas_receber ADD COLUMN [data_operacao_long] [INTEGER] NULL',
              'ALTER TABLE cliente_contas_receber ADD COLUMN [valor_operacao] [float] NULL',
              'ALTER TABLE cliente ADD COLUMN [status] [INTEGER] NULL',
            ],
          }
        );

        let versaoAtual = await this.getNumeroVersaoBanco();

        if (!versaoAtual) {
          versaoAtual = 0;
        }

        const atualizacoesExecutar = atualizacoes.filter(
          (c) => c.numero_versao > versaoAtual
        );

        console.log(
          `${atualizacoesExecutar.length} atualizações para executar`
        );

        if (atualizacoesExecutar.length > 0) {
          const scripts = [];
          atualizacoesExecutar.forEach((versao) => {
            versao.scripts.forEach((script) => {
              scripts.push([script]);
            });
          });
          db.sqlBatch(scripts)
            .then(() => {
              this.setAtualizacao(db, atualizacoesExecutar)
                .then(() => {
                  console.log('Atualizações realizada com sucesso!');
                })
                .catch((e) => {
                  Util.TratarErro(e);
                  Util.Notificacao('Executar registrar numero versao', 'error');
                });
            })
            .catch((e) => {
              Util.TratarErro(e);
              Util.Notificacao('Executar atualizações', 'error');
            });
        }
      })
      .catch((e) => {
        Util.TratarErro(e);
        Util.Notificacao('Erro ao criar tabelas', 'error');
      });
  }
}

export class AtualizacoesModel {
  numero_versao: number | any;
  scripts: string[];
}
