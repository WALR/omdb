import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';

import { FormControl } from '@angular/forms';

import { MoviesComponent } from '../movies/movies.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  kerwords: string = "";
  searchControl: FormControl = new FormControl();
  
  constructor(private service: MoviesService) { }

  ngOnInit() {
    this.searchControl.valueChanges
        .debounceTime(500)
        .distinctUntilChanged()
        .subscribe(newValue => this.service.search(newValue));
  }

  search(){
    this.service.search(this.kerwords);
  }

}
