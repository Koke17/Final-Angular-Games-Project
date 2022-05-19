import { Component, OnInit } from '@angular/core';
import { Engine } from "../engine";
import { EngineService } from "../engine.service";

import { Location, NgClass } from '@angular/common';


@Component({
  selector: 'app-engines',
  templateUrl: './engines.component.html',
  styleUrls: ['./engines.component.css']
})
export class EnginesComponent implements OnInit {

  engines: Engine[] = [];

  constructor(private engineService: EngineService, private location: Location) 
  { }

  ngOnInit(): void {
    this.getengines() //como queremos que se displaye nada mas iniciar la vista
  }

  getengines():void {
    this.engineService.getEngines()
        .subscribe(engines => {
          this.engines = engines
          console.log(this.engines);
        } );  //Esto te va a ir metiendo cada uno de los generos al array
  }

  delete(engine: Engine): void {
    this.engines = this.engines.filter(h => h !== engine);
    this.engineService.deleteEngine(engine.id).subscribe();
  }

  goBack(): void {
    this.location.back();
  }

}
