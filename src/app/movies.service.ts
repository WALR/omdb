import { Injectable } from '@angular/core';
import { Movie } from './movies/movie';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MoviesService {
  movies: Movie[];
  constructor(private http:Http) { 
    this.movies = [
      {title:"Pelicula :) 1",id:"1"},
      {title:"Pelicula :) 2",id:"2"},
      {title:"Pelicula :) 3",id:"3"},
      {title:"Pelicula :) 4",id:"4"}                  
    ];
  }

  search(keyword: string){
    this.getMovies(keyword).subscribe(
      respuesta => this.movies = respuesta,
      error => console.log(error)
    )
  }

  getMovies(keyword : string): Observable<Movie[]>{
    return this.http
              .get("http://www.omdbapi.com/?s="+keyword)
              .map(this.parseResponse)
              .catch(() => Observable.throw("Vaya!, algo salio mal."))
  }

  parseResponse(response: Response): Movie[]{
    if(!response.json() || !response.json().Search) return [];

    return response.json().Search.map(
      jsonMovie => new Movie(jsonMovie['Title'], 
                            jsonMovie['imdbID'],
                            jsonMovie['Year'],
                            jsonMovie['Type'])
    )
  }
}
