import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobaldataService } from './services/globaldata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Eventos Cloud';
  constructor(private router: Router, public globalService: GlobaldataService){
  }

  salir(){
    this.globalService.SetUser(0);
    this.router.navigate(['/login']);
  }
}
