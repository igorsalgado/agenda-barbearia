import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getAgendamentos() {
    return this.http.get(`${this.baseUrl}/agendamentos`);
  }

  public buscarAgendamentoPorId(id: number) {
    return this.http.get(`${this.baseUrl}/agendamentos/${id}`);
  }

  public buscarAgendamentoPorData(data: string) {
    return this.http.get(`${this.baseUrl}/agendamentos/data/${data}`);
  }

  public buscarAgendamentoPorNomeCliente(nome: string) {
    return this.http.get(`${this.baseUrl}/agendamentos/agendados/cliente/${nome}`);
  }

  public buscarAgendamentoPorNomeBarbeiro(nome: string) {
    return this.http.get(`${this.baseUrl}/agendamentos/agendados/barbeiro/${nome}`);
  }

  public criarAgendamento(agendamento: any) {
    return this.http.post(`${this.baseUrl}/agendamentos`, agendamento);
  }

  public atualizarAgendamento(id: number, agendamento: any) {
    return this.http.put(`${this.baseUrl}/agendamentos/${id}`, agendamento);
  }

  public deletarAgendamento(id: number) {
    return this.http.delete(`${this.baseUrl}/agendamentos/${id}`);
  }

}
