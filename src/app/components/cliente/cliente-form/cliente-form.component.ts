import { ClienteService } from '../../../services/clientes.service';
import { Clientes } from './../../../models/clientes';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cliente-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent implements OnInit {
  cliente: Clientes = {
    id: 0,
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    endereco: ''
  };

  editando = false;

  constructor(
    private service: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.service.getById(+id).subscribe(c => this.cliente = c);
    }
  }

  salvar(): void {
    if (this.editando) {
      this.service.update(this.cliente.id, this.cliente).subscribe(() => {
        this.router.navigate(['/clientes']);
      });
    } else {
      this.service.create(this.cliente).subscribe(() => {
        this.router.navigate(['/clientes']);
      });
    }
  }
}
