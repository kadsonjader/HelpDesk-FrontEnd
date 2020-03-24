import { Usuario } from './usuario.model';

export class Ticket {
  constructor(
    public id: string,
    public numero: number,
    public titulo: string,
    public status: string,
    public prioridade: string,
    public imagem: string,
    public usuario: Usuario,
    public assignedUser: Usuario,
    public data: string,
    public changes: Array<string>,
  ){}
}
