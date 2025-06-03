import { Component, OnInit } from '@angular/core';
import { Produto } from '../../../models/produtos';
import { ProdutoService } from '../../../services/produtos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produto-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.css'
})
export class ProdutoFormComponent implements OnInit {
  produto: Produto = {
    id: 0,
    nome: '',
    descricao: '',
    preco: 0,
    estoque: 0,
    categoria_id: 0,
    fornecedor_id: 0,
    codigo_barras: ''
  };

  editando = false;

  constructor(
    private service: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.service.getById(+id).subscribe(p => (this.produto = p));
    }
  }

  salvar(): void {
    if (this.editando) {
      this.service.update(this.produto.id, this.produto).subscribe(() => {
        this.router.navigate(['/produtos']);
      });
    } else {
      this.service.create(this.produto).subscribe(() => {
        this.router.navigate(['/produtos']);
      });
    }
  }
}
