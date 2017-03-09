import { Injectable } from '@angular/core';
import { Movie, MovieSearch } from './movies/movie';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MoviesService {
  movies: Movie[];
  pagesResult: Number;
  constructor(private http:Http) { 
    this.movies = [
      {title:"Pelicula :) 1",id:"1"},
      {title:"Pelicula :) 2",id:"2"},
      {title:"Pelicula :) 3",id:"3"},
      {title:"Pelicula :) 4",id:"4"}                  
    ];
    // this.pagesResult = 0;
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
    // this.pagesResult = response.json()['totalResults'];
    // console.log(this.pagesResult);
    return response.json().Search.map(
      jsonMovie => new Movie(jsonMovie['Title'], 
                            jsonMovie['imdbID'],
                            jsonMovie['Year'],
                            jsonMovie['Type'])
    )
  }

  // parseSearchResponse(response: Response): MovieSearch {
  //       console.log("Processing response %s", response);
        
  //       let movieSearch = new MovieSearch();
  //       if (response.json().Response === "True") {
  //           movieSearch.totalResults = response.json().totalResults;
  //           movieSearch.movies = this.parseMovie(response);
  //       }
        
  //       return movieSearch;
  // }

  // parseMovie(response): Movie[]{
  //   return response.json().Search.map(
  //     jsonMovie => new Movie(jsonMovie['Title'], 
  //                           jsonMovie['imdbID'],
  //                           jsonMovie['Year'],
  //                           jsonMovie['Type'])
  //   )
  // }

  setPage(){
    // this.pagesResult = response.json()['totalResults'];
    console.log(this.pagesResult);
  }

  // getPage(){
  //   // return this.pagesResult;
  //   console.log(this.pagesResult)
  // }
}
