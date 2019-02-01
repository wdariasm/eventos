import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Evento } from '../services/evento';
import { EventosService } from '../services/eventos.service';
import { GlobaldataService } from '../services/globaldata.service';

@Component({
  selector: 'app-list-eventos',
  templateUrl: './list-eventos.component.html',
  styleUrls: ['./list-eventos.component.css']
})
export class ListEventosComponent implements OnInit {

  listEvents : Evento [];
  userId : number; 

  constructor(public eventService: EventosService, public globalService: GlobaldataService,
    private router: Router) { 
    this.globalService.GetUser();
    if (this.globalService.IdUser == 0){
      this.router.navigate(['/login']);
      return;
    }
  }

  ngOnInit() {
    this.globalService.GetUser();
    if (this.globalService.IdUser == 0){
      this.router.navigate(['/login']);
      return;
    }

    this.userId = this.globalService.IdUser;

    this.consultarEventos();
  }

  consultarEventos (){
    this.eventService.getByUser(this.userId).subscribe(
      result => {    
        if (result != null){
          this.listEvents  = result;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  agregar(){
    this.globalService.HabilitarCampos = true;
    this.globalService.IdEvento = 0;
    this.globalService.Operacion = "Nuevo";
    this.router.navigate(['/events']);
  }

  detalle (idEvento : number){
    this.globalService.HabilitarCampos = false;
    this.globalService.IdEvento = idEvento;
    this.globalService.Operacion = "Detalle";
    this.router.navigate(['/events']);
  }

  actualizar(idEvento : number){
    this.globalService.HabilitarCampos = true;
    this.globalService.IdEvento = idEvento;
    this.globalService.Operacion = "Actualizar";
    this.router.navigate(['/events']);
  }

  eliminar(idEvento : number){
    this.eventService.delete(idEvento).subscribe(
      result => {
          alert("Evento eliminado correctamente");
          this.consultarEventos();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
