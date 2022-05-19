import { Component, OnInit } from '@angular/core';

import { Videogame } from "../videogame";
import { Engine } from "../engine";
import { Studio } from "../studio";
import { Genre } from "../genre";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
