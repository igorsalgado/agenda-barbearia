import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BarbeiroService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getBarbeiros() {
    return this.http.get(`${this.baseUrl}/barbeiros`);
  }

  public buscarBarbeiroPorId(id: number) {
    return this.http.get(`${this.baseUrl}/barbeiros/${id}`);
  }

  public buscarBarbeiroPorNome(nome: string) {
    return this.http.get(`${this.baseUrl}/barbeiros/cadastrados/${nome}`);
  }

  public criarBarbeiro(barbeiro: any) {
    return this.http.post(`${this.baseUrl}/barbeiros`, barbeiro);
  }

  public atualizarBarbeiro(id: number, barbeiro: any) {
    return this.http.put(`${this.baseUrl}/barbeiros/${id}`, barbeiro);
  }

  public deletarBarbeiro(id: number) {
    return this.http.delete(`${this.baseUrl}/barbeiros/${id}`);
  }



}