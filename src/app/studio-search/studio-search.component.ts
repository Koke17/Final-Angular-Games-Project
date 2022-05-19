import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Studio } from "../studio";
import { StudioService } from "../studio.service";


@Component({
  selector: 'app-studio-search',
  templateUrl: './studio-search.component.html',
  styleUrls: ['./studio-search.component.css']
})
export class StudioSearchComponent implements OnInit {

  
  studios$!: Observable<Studio[]>;
  
  private searchTerms = new Subject<string>();

  constructor(private studioService: StudioService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.studios$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.studioService.searchstudios(term)),
    );
  }

}
