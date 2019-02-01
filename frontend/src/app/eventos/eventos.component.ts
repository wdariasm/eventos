import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Evento } from '../services/evento';
import { EventosService } from '../services/eventos.service';
import { GlobaldataService } from '../services/globaldata.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  titulo: string = 'Crear Evento';
  eventos: Evento;
  habilitarCampos : boolean;

  constructor(public eventoService: EventosService, public globalService: GlobaldataService,
    private router: Router) {
    this.eventos = new Evento();
  }

  ngOnInit() {
    if (this.globalService.IdUser == 0){
      this.router.navigate(['/login']);
      return;
    }

    if (this.globalService.IdEvento == null){
      this.cancelar();
      return; 
    }

    this.habilitarCampos = this.globalService.HabilitarCampos;
    if(this.globalService.IdEvento != 0){
        this.getEvento(this.globalService.IdEvento);
    }
  }


  guardar() {
    if (this.eventos.name == "" || this.eventos.address == "" ||
      this.eventos.place == "") {
      alert("Ingrese los datos requeridos");
      return;
    }

    this.eventos.userId = this.globalService.IdUser;

    if (this.globalService.Operacion == "Nuevo"){
      this.eventoService.post(this.eventos).subscribe(
        result => {        
          this.eventos = new Evento();
          alert("Datos guardado correctamente")
        },
        error => {
          alert("Error al guardar datos");
          console.log(JSON.stringify(error));
        }
      );
    } else  if (this.globalService.Operacion == "Actualizar"){
      this.eventoService.put(this.globalService.IdEvento, this.eventos).subscribe(
        result => {        
          this.eventos = new Evento();
          alert("Datos actualizados correctamente")
        },
        error => {
          alert("Error al actualizar datos");
          console.log(JSON.stringify(error));
        }
      );
    } else {
      alert("Operación no valida");
    }

    
  }


  cancelar (){
    this.router.navigate(['/list']);
  }

  getEvento(idEvento : number){
    this.eventoService.get(idEvento).subscribe(
      result => {    
        if (result != null){
          this.eventos = result;
        } 
      },
      error => {
        console.log(<any>error);
        
      }
    );
  }



}
