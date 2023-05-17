import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getClientes() {
    return this.http.get(`${this.baseUrl}/clientes`);
  }

  public buscarClientePorId(id: number) {
    return this.http.get(`${this.baseUrl}/clientes/${id}`);
  }

  public buscarClientePorNome(nome: string) {
    return this.http.get(`${this.baseUrl}/clientes/cadastrados/${nome}`);
  }

  public buscarClientePorTelefone(telefone: String) {
    return this.http.get(`${this.baseUrl}/clientes/cadastrados/telefone/${telefone}`);
  }

  public criarCliente(cliente: any) {
    return this.http.post(`${this.baseUrl}/clientes`, cliente);
  }

  public atualizarCliente(cliente: any) {
    return this.http.put(`${this.baseUrl}/clientes`, cliente);
  }

  public deletarCliente(id: number) {
    return this.http.delete(`${this.baseUrl}/clientes/${id}`);
  }

}
