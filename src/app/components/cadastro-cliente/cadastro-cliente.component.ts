import { ClienteService } from 'src/app/services/cliente.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent {

  cliente = {
    nome : '',
    telefone : '',
  }

  constructor(private ClienteService: ClienteService, private router: Router) { }

  criarCliente() {
    this.ClienteService.criarCliente(this.cliente).subscribe((cliente: any) => {
      this.router.navigate(['/cadastro-cliente']);
    });
  }

}
