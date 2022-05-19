import { Component, OnInit } from '@angular/core';
import { Studio } from '../studio';
import { StudioService } from '../studio.service';

import { Location, NgClass } from '@angular/common';


@Component({
  selector: 'app-studios',
  templateUrl: './studios.component.html',
  styleUrls: ['./studios.component.css']
})
export class StudiosComponent implements OnInit {

  studios: Studio[] = [];

  constructor(private studioService: StudioService, private location: Location) 
  { }

  ngOnInit(): void {
    this.getstudios() //como queremos que se displaye nada mas iniciar la vista
  }

  getstudios():void {
    this.studioService.getstudios()
        .subscribe(studios => {
          this.studios = studios
          console.log(this.studios);
        } );  //Esto te va a ir metiendo cada uno de los generos al array
  }

  delete(studio: Studio): void {
    this.studios = this.studios.filter(h => h !== studio);
    this.studioService.deletestudio(studio.id).subscribe();
  }

  goBack(): void {
    this.location.back();
  }

}
