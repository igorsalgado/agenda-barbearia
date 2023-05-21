import { ClienteService } from 'src/app/services/cliente.service';
import { BarbeiroService } from './../../services/barbeiro.service';
import { Component } from '@angular/core';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-cadastro-agendamento',
  templateUrl: './cadastro-agendamento.component.html',
  styleUrls: ['./cadastro-agendamento.component.css'],
})
export class CadastroAgendamentoComponent {
  agendamento: any = {
    cliente: '',
    barbeiro: '',
    dataAgendamento: '',
  };

  telefoneCliente: string = '';

  barbeiros: any[] = []; 

  constructor(
    private clienteService: ClienteService,
    private barbeiroService: BarbeiroService,
    private agendamentoService: AgendamentoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getBarbeiros();
  }

  buscarClientesPorTelefone() {
    this.clienteService
      .buscarClientePorTelefone(this.telefoneCliente)
      .subscribe({
        next: (cliente: any) => {
          if (cliente.length > 0) {
            this.agendamento.cliente = cliente[0];
            console.log('Cliente encontrado:', this.agendamento.cliente);
          } else {
            console.log('Cliente não encontrado');
          }
        },
        error: (error: any) => {
          console.log('Erro ao buscar o cliente: ', error);
        },
      });
  }

  getBarbeiros() {
    return this.barbeiroService.getBarbeiros().subscribe({
      next: (barbeiros: any) => {
        this.barbeiros = barbeiros;
        console.log('Barbeiros: ', this.barbeiros);
      },
      error: (error: any) => {
        console.log('Erro ao buscar os barbeiros: ', error);
      }
    });
  }

  buscarBarbeiroPorNome(nomeBarbeiro: string) {
    const barbeiroSelecionado = this.barbeiros.find(barbeiro => barbeiro.nome === nomeBarbeiro);
    if (barbeiroSelecionado) {
      this.agendamento.barbeiro = barbeiroSelecionado;
      console.log('Barbeiro encontrado: ', this.agendamento.barbeiro);
    } else {
      console.log('Barbeiro não encontrado');
    }
  }

  criarAgendamento() {

    if(this.agendamento.cliente == '' || this.agendamento.barbeiro == ''){
      alert('Cliente ou Barbeiro não encontrado');
      return;
    }
    console.log('Cliente: ', this.agendamento.cliente);
    console.log('Barbeiro: ', this.agendamento.barbeiro);
    console.log('Data: ', this.agendamento.dataAgendamento);

    this.agendamentoService.criarAgendamento(this.agendamento).subscribe({
      next: (agendamento: any) => {
        console.log('Agendamento criado com sucesso: ', agendamento);
      },
      error: (error: any) => {
        console.log('Erro ao criar o agendamento: ', error);
      },
    });
  }
}
