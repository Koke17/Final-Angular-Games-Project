import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Engine } from "../engine";
import { EngineService } from "../engine.service";


@Component({
  selector: 'app-engine-search',
  templateUrl: './engine-search.component.html',
  styleUrls: ['./engine-search.component.css']
})
export class EngineSearchComponent implements OnInit {

  
  engines$!: Observable<Engine[]>;
  
  private searchTerms = new Subject<string>();

  constructor(private engineService: EngineService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.engines$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.engineService.searchEngines(term)),
    );
  }

}
