import { Ticket } from './../model/ticket.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HELP_DESK_API } from './helpdesk.api';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  createOrUpdate(ticket: Ticket){
    if(ticket.id != null && ticket.id != ''){
    return this.http.put(`${HELP_DESK_API}/api/ticket`,ticket);
     } else {
      ticket.id = null;
      ticket.status = 'Novo';
      return this.http.put(`${HELP_DESK_API}/api/ticket`,ticket);
    }
  }

  findAll(page: number, count: number){
    return this.http.get(`${HELP_DESK_API}/api/ticket/${page}/${count}`);
  }

  findByid(id: string){
    return this.http.get(`${HELP_DESK_API}/api/ticket/${id}`);
  }

  delete(id: string){
    return this.http.delete(`${HELP_DESK_API}/api/ticket/${id}`);
  }

  findByParams(page:number, count:number, assignedToMe: boolean, t:Ticket){
    t.numero = t.numero == null ? 0 : t.numero;
    t.titulo = t.titulo == '' ? 'uninformed' : t.titulo;
    t.status = t.status == '' ? 'uninformed' : t.status;
    t.prioridade = t.prioridade == '' ? 'uninformed' : t.prioridade;
    return this.http.get(`${HELP_DESK_API}/api/ticket/${page}/${count}/${t.numero}/${t.titulo}/${t.status}
    /${t.prioridade}/${assignedToMe}/`);
  }

  changeStatus(status: string, ticket: Ticket){
    return this.http.put(`${HELP_DESK_API}/api/ticket/${ticket.id}/${status}`,ticket);
  }

  summary(){
    return this.http.get(`${HELP_DESK_API}/api/ticket/summary`);
  }
}
