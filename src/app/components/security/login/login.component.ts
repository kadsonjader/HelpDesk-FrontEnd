import { CurrentUser } from './../../../model/current-user.model';
import { UsuarioService } from './../../../services/usuario.service';
import { Usuario } from './../../../model/usuario.model';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario = new Usuario('','','','');
  shared = new SharedService;
  message: string;
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
   }

  ngOnInit(): void {
  }
  login(){
    this.message='';
    this.usuarioService.login(this.usuario).subscribe((userAuthentication: CurrentUser) => {
      this.shared.token =  userAuthentication.token;
      this.shared.usuario = userAuthentication.usuario;
      this.shared.usuario.profile = this.shared.usuario.profile.substring(5);
      this.shared.showTemplate.emit(true);
      this.router.navigate(['/']);
    }, err => {
      this.shared.token = null;
      this.shared.usuario = null;
      this.shared.showTemplate.emit(false);
      this.message = 'Erro';
    });
  }

  cancelLogin(){
    this.message = '';
    this.usuario = new Usuario('','','','');
    window.location.href = '/login';
    window.location.reload();
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

}
