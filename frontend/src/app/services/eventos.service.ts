import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';
import { Evento, Usuario } from './evento';


@Injectable({
  providedIn: 'root'
})
export class EventosService {
  public uri : string;
  constructor(public http: HttpClient) { 
    this.uri = "http://127.0.0.1:8000/api";
  }

  get (id: number): Observable<any> {
    return  this.http.get(this.uri+'/events/'+id);
  };


  getByUser (userId: number): Observable<any> {
    return  this.http.get(this.uri+'/events/user/'+  userId );
  };


  post (evento: Evento): Observable<any> {
    let data  = JSON.stringify(evento);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return  this.http.post(this.uri+'/events/', data, {headers: headers}); 
  };   

  put (id: number, evento: Evento): Observable<any> {    
    let data  = JSON.stringify(evento);
    let headers = new HttpHeaders().set('Content-Type','application/json');    
    return  this.http.put(this.uri+'/events/' + id +'/', data, {headers: headers} );                  
  };

  
  delete(id: number): Observable<any> {
    return  this.http.delete(this.uri+'/events/'+id + '/');
  };

  postUser(user : Usuario){
    let data  = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return  this.http.post(this.uri+'/users/', data, {headers: headers}); 
  }

  postLogin(user : Usuario){
    let data  = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return  this.http.post(this.uri+'/login/', data, {headers: headers}); 
  }

  
}
