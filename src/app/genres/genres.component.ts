import { Component, OnInit } from '@angular/core';
import { Genre } from '../genre';

import { GenreService } from "../genre.service";

import { Location, NgClass } from '@angular/common';


@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  genres: Genre[] = [];

  constructor(private genreService: GenreService, private location: Location) 
  { }

  ngOnInit(): void {
    this.getGenres() //como queremos que se displaye nada mas iniciar la vista
  }

  getGenres():void {
    this.genreService.getGenres()
        .subscribe(genres => {
          this.genres = genres
          console.log(this.genres);
        } );  //Esto te va a ir metiendo cada uno de los generos al array
  }

  delete(genre: Genre): void {
    this.genres = this.genres.filter(h => h !== genre);
    this.genreService.deleteGenre(genre.id).subscribe();
  }

  goBack(): void {
    this.location.back();
  }

}
