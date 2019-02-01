import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from '../services/evento';
import { EventosService } from '../services/eventos.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario : Usuario ;

  constructor(public eventoService: EventosService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }


  guardar(){
     if (this.usuario.email == "" || this.usuario.password == ""){
        alert("Ingrese los datos requeridos");
        return;
     }

     let username = this.usuario.email;
     this.usuario.username =  username.replace(/[:\.-@]/g, "");

     this.eventoService.postUser(this.usuario).subscribe(
      result => {        
        this.usuario = new Usuario();
        alert("Usuario guardado correctamente");
      },
      error => {
        alert("Error al guardar datos");
        console.log(JSON.stringify(error));
      }
    );
  }

  cancelar(){
    this.router.navigate(['/login']);
  }

}
