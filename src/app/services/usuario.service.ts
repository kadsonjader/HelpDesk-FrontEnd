import { HELP_DESK_API } from './helpdesk.api';
import { Usuario } from './../model/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {}

  login(usuario: Usuario){
    return this.http.post(`${HELP_DESK_API}/api/auth`, usuario);
  }

  createOrUpdate(usuario: Usuario){
    if(usuario.id != null && usuario.id != ''){
      return this.http.put(`${HELP_DESK_API}/api/user`,usuario);
    }else{
      usuario.id = null;
      return this.http.post(`${HELP_DESK_API}/api/user`,usuario);
    }
  }

  findAll(page: number, count:number){
    return this.http.get(`${HELP_DESK_API}/api/user/${page}/${count}`);
  }

  findById(id: string){
    return this.http.get(`${HELP_DESK_API}/api/user/${id}`);
  }

  delete(id: string){
    return this.http.delete(`${HELP_DESK_API}/api/user/${id}`);
  }
}
