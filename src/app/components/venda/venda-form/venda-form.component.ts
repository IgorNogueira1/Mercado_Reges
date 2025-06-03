import { ItemVenda } from './../../../models/item-venda';
import { Venda } from './../../../models/venda';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Clientes } from '../../../models/clientes';
import { Produto } from '../../../models/produtos';
import { ClienteService } from '../../../services/clientes.service';
import { ProdutoService } from '../../../services/produtos.service';
import { VendaService } from '../../../services/venda.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-venda-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.css']
})
export class VendaFormComponent implements OnInit {
  clientes: Clientes[] = [];
  produtos: Produto[] = [];
  venda: Venda = {
    id: 0,
    cliente_id: undefined,
    data: new Date().toISOString(),
    valor_total: 0,
    forma_pagamento: 'Dinheiro',
    itens: []
  };
editando: any;

  constructor(
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private vendaService: VendaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clienteService.getAll().subscribe(c => this.clientes = c);
    this.produtoService.getAll().subscribe(p => this.produtos = p);
  }

  adicionarItem(produto_id: number, quantidade: number): void {
    const produto = this.produtos.find(p => p.id === produto_id);
    if (!produto || quantidade <= 0) return;

    const item: ItemVenda = {
      produto_id,
      quantidade,
      preco_unitario: produto.preco
    };

    this.venda.itens.push(item);
    this.atualizarTotal();
  }

  atualizarTotal(): void {
    this.venda.valor_total = this.venda.itens.reduce((soma, item) =>
      soma + item.quantidade * item.preco_unitario, 0
    );
  }

  salvar(): void {
    this.vendaService.create(this.venda).subscribe(() => {
      this.router.navigate(['/vendas']);
    });
  }
}
