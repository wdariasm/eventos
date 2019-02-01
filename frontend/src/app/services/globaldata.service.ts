import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobaldataService {

  public IdEvento : number;
  public Operacion: String; 
  public HabilitarCampos: boolean;
  public IdUser : number = 0;


  constructor() {
    this.GetUser();
   }

  public SetUser(id: number){
    localStorage.setItem("user", btoa(id.toString()));
  }
  public GetUser(){
    let user =atob(localStorage.getItem("user"));
    this.IdUser = parseInt(user);
  }
}
