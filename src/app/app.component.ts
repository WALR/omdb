import { Component } from '@angular/core';
import { MoviesService } from './movies.service';
import './rxjs-operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App con Angular 2';

  constructor(private service: MoviesService){}
  
  agregarPelicula(){
    this.service.movies.push({title:"Pelicula :) 2016",id:"2016"})
  }
}
