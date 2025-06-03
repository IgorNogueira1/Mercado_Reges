import { Component, OnInit } from '@angular/core';
import { VendaService } from '../../../services/venda.service';
import { Venda } from '../../../models/venda';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-venda-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './venda-list.component.html',
  styleUrl: './venda-list.component.css'
})
export class VendaListComponent implements OnInit {
  vendas: Venda[] = [];

  constructor(private service: VendaService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(data => this.vendas = data);
  }

  deletar(id: number): void {
    this.service.delete(id).subscribe(() => {
      this.vendas = this.vendas.filter(v => v.id !== id);
    });
  }
}
