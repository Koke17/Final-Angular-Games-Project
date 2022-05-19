import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Videogame } from "../videogame";
import { VideogameService } from "../videogame.service";


@Component({
  selector: 'app-videogame-search',
  templateUrl: './videogame-search.component.html',
  styleUrls: ['./videogame-search.component.css']
})
export class VideogameSearchComponent implements OnInit {

  
  videogames$!: Observable<Videogame[]>;
  
  private searchTerms = new Subject<string>();

  constructor(private videogameService: VideogameService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.videogames$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.videogameService.searchVideogames(term)),
    );
  }

}
