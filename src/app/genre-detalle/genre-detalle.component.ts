import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location, NgClass } from '@angular/common';

import { Genre } from "../genre";
import { GenreService } from '../genre.service';

/*Para validar forms*/
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-genre-detalle',
  templateUrl: './genre-detalle.component.html',
  styleUrls: ['./genre-detalle.component.css']
})
export class GenreDetalleComponent implements OnInit {

  genre: Genre | undefined; 
  id: number = 0;
  isNewGenre = false;

  genreForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
   });

  constructor(
    private route: ActivatedRoute,
    private genreService: GenreService,
    private location: Location
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id')); //cogemos el id de la ruta
    if (!id) {
      this.isNewGenre = true;
      return;
    }
    this.id = id;
  }

  ngOnInit(): void {
    if (!this.isNewGenre) {
      this.getGenre(); // Al iniciarse la pagina que se ejecute el metodo
    }
  }

  goBack(): void {
    this.location.back();
  }

  getGenre(){
    this.genreService.getGenre(this.id)
      .subscribe(genre => { //Nos suscribimos porque queremos recibir la informacion de manera asincrona del Observable de tipo Genre
        this.genre = genre;
        this.inicializarForm(genre); //hacemos que se rellene el formulario con los datos del elemento
      });
  }

  inicializarForm(genre: Genre) {
    this.genreForm.controls['name'].setValue(genre.name); 
  }

  onFormSubmit():void {
    
    // Si el elemento imagen no tiene valor no seguir adelante
    if (!this.genreForm.valid)
      return;    
      
    if (!this.isNewGenre) {

      let request = {
        ...this.genreForm.getRawValue()
      };

      this.genreService.updateGenre(request, this.id) //le tengo que pasar al updated genre el valor actualizado del formulario, es por eso que le paso el objeto request
        .subscribe(() => this.goBack());
      
    }else {
      let request = {
        ...this.genreForm.getRawValue()
      };

      this.genreService.addGenre(request) //le tengo que pasar al add genre el valor actualizado del formulario, es por eso que le paso el objeto request
        .subscribe(() => this.goBack());
      
    }
  }


}
