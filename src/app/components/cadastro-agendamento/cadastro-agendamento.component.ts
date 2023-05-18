import { ClienteService } from 'src/app/services/cliente.service';
import { BarbeiroService } from './../../services/barbeiro.service';
import { Component } from '@angular/core';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-cadastro-agendamento',
  templateUrl: './cadastro-agendamento.component.html',
  styleUrls: ['./cadastro-agendamento.component.css']
})
export class CadastroAgendamentoComponent {

  agendamento: any = {
    cliente: '',
    barbeiro: '',
    dataAgendamento: '',
  };

  constructor(
    private clienteService: ClienteService,
    private barbeiroService: BarbeiroService,
    private agendamentoService: AgendamentoService, 
    private router: Router) { }

    ngOnInit() {
      this.buscarBarbeiros();
    }
      
    buscarClientes(telefone: string) {
      this.clienteService.buscarClientePorTelefone(telefone).subscribe(
      {
        next: (cliente: any) => {
          if (cliente.length > 0) {
            this.agendamento.cliente = cliente[0];
          } else {
            console.log('Cliente não encontrado');
          }
        },
        error: (error: any) => {
          console.log('Erro ao buscar o cliente: ', error);
        }
      }
    );
  }

  buscarBarbeiros() {
    this.barbeiroService.getBarbeiros().subscribe(
      {
      next: (barbeiros: any) => {
        this.agendamento.barbeiro = barbeiros.map((barbeiro: any) => ({ id: barbeiro._id, nome: barbeiro.nome }));
      },
      error: (error: any) => {
        console.log('Erro ao buscar barbeiros: ', error);
      }
    }
    );
  }
  
  criarAgendamento() {
      const barbeiroSelecionado = this.agendamento.barbeiro.find((barbeiro: any) => barbeiro.nome === this.agendamento.barbeiro);
      this.agendamento.barbeiro = barbeiroSelecionado;

      this.agendamentoService.criarAgendamento(this.agendamento).subscribe({
        next: (agendamento: any) => {
          console.log('Agendamento criado com sucesso: ', agendamento);
          this.router.navigate(['/home-page']);
        },
        error: (error: any) => {
          console.log('Erro ao criar agendamento: ', error);
        }
      });
  }
}