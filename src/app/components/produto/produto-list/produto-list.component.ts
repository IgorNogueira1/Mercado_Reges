import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../../services/produtos.service';
import { Produto } from '../../../models/produtos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-produto-list',
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
  templateUrl: './produto-list.component.html',
  styleUrl: './produto-list.component.css'
})
export class ProdutoListComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produtoService.getAll().subscribe(data => {
      this.produtos = data;
    });
  }

  deletar(id: number): void {
    this.produtoService.delete(id).subscribe(() => {
      this.produtos = this.produtos.filter(p => p.id !== id);
    });
  }
}
