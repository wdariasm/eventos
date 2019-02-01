import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from '../services/evento';
import { EventosService } from '../services/eventos.service';
import { GlobaldataService } from '../services/globaldata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   usuario : Usuario;
  constructor(public eventoService: EventosService, private router: Router, 
            public globalService: GlobaldataService) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
    this.globalService.GetUser();
    if (this.globalService.IdUser > 0){
      this.router.navigate(['/list']);
      return;
    }
  }

  iniciar(){
    if (this.usuario.email == "" || this.usuario.password == ""){
       alert("Ingrese los datos requeridos");
       return;
    }

    this.eventoService.postLogin(this.usuario).subscribe(
     result => {        
        this.globalService.IdUser = result['id'];
        this.globalService.SetUser(this.globalService.IdUser);
        this.router.navigate(['/list']);
     },
     error => {
      console.log(JSON.stringify(error));

       if (error.error != null){
          alert("Error al iniciar session");
       }
     }
   );
 }

  registro(){
    this.router.navigate(['/registro']);
  }

}
