import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Genre } from "../genre";
import { GenreService } from "../genre.service";


@Component({
  selector: 'app-genre-search',
  templateUrl: './genre-search.component.html',
  styleUrls: ['./genre-search.component.css']
})
export class GenreSearchComponent implements OnInit {

  
  genres$!: Observable<Genre[]>;
  
  private searchTerms = new Subject<string>();

  constructor(private genreService: GenreService) {}  

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.genres$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.genreService.searchGenres(term)),
    );
  }

}
