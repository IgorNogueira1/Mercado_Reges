import { Component, OnInit } from '@angular/core';
import { Clientes } from './../../../models/clientes';
import { ClienteService } from '../../../services/clientes.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-list',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent implements OnInit {
  clientes: Clientes[] = [];

  constructor(private clientesService: ClienteService) {}

  ngOnInit(): void {
    this.clientesService.getAll().subscribe(data => {
      this.clientes = data;
    });
  }

  deletar(id: number): void {
    this.clientesService.delete(id).subscribe(() => {
      this.clientes = this.clientes.filter(c => c.id !== id);
    });
  }
}
