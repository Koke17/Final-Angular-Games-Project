import { Component, OnInit } from '@angular/core';

import { Videogame } from "../videogame";
import { VideogameService } from "../videogame.service";

import { Location, NgClass } from '@angular/common';

@Component({
  selector: 'app-videogames',
  templateUrl: './videogames.component.html',
  styleUrls: ['./videogames.component.css']
})
export class VideogamesComponent implements OnInit {

  videogames: Videogame[] = [];

  constructor(private videogameService: VideogameService, private location: Location) 
  { }

  ngOnInit(): void {
    this.getVideogames() //como queremos que se displaye nada mas iniciar la vista
  }

  getVideogames():void {
    this.videogameService.getVideogames()
        .subscribe(videogames => {
          this.videogames = videogames
          console.log(this.videogames);
        } );  //Esto te va a ir metiendo cada uno de los generos al array
  }

  delete(videogame: Videogame): void {
    this.videogames = this.videogames.filter(h => h !== videogame);
    this.videogameService.deleteVideogame(videogame.id).subscribe();
  }

  goBack(): void {
    this.location.back();
  }

}
