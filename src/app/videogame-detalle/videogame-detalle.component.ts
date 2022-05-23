import { Component, OnInit } from '@angular/core';

import { Location, NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Videogame } from "../videogame";
import { VideogameService } from '../videogame.service';

import { EngineService } from "../engine.service";
import { StudioService } from '../studio.service';
import { GenreService } from "../genre.service";

/*Para validar forms*/
import { FormGroup, FormControl, Validators } from "@angular/forms";




@Component({
  selector: 'app-videogame-detalle',
  templateUrl: './videogame-detalle.component.html',
  styleUrls: ['./videogame-detalle.component.css']
})
export class VideogameDetalleComponent implements OnInit {

  videogame: Videogame | undefined; 

  engineList: any;
  studioList: any;
  genreList: any;

  id: number = 0;
  isNewvideogame = false;
  fecha: Date | undefined;

  img: string | undefined;
  nuevaImagen = false ;

  videogameForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    mode: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    engineId: new FormControl('', [Validators.required]),
    developmentStudioIds: new FormControl('', [Validators.required]),
    genreIds: new FormControl('', [Validators.required]),
    imgPath: new FormControl(''),
   });

  constructor(
    private route: ActivatedRoute,
    private videogameService: VideogameService,
    private location: Location,
    private engineService: EngineService,
    private studioService: StudioService,
    private genreService: GenreService,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id')); //cogemos el id de la ruta
    if (!id) {
      this.isNewvideogame = true;
      return;
    }
    this.id = id;
    
  }

  ngOnInit(): void {
    if (!this.isNewvideogame) {
      this.getvideogame(); // Al iniciarse la pagina que se ejecute el metodo
    }
    this.getEngines();
    this.getGenres();
    this.getStudios();    
  }

  getEngines(){
    this.engineService.getEngines().subscribe(engines => {
      console.log(engines);
      this.engineList = engines;
    });
  }

  getStudios(){
    this.studioService.getstudios().subscribe(studios => {
      console.log(studios);
      this.studioList = studios;
    });
  }

  getGenres(){
    this.genreService.getGenres().subscribe(genres => {
      console.log(genres);
      this.genreList = genres;
    });
  }

  goBack(): void {
    this.location.back();
  }

  getvideogame(){
    this.videogameService.getVideogame(this.id)
      .subscribe(videogame => { //Nos suscribimos porque queremos recibir la informacion de manera asincrona del Observable de tipo videogame
        console.log(videogame);
        this.videogame = videogame;
        this.img = videogame.imgPath; //Guardamos el valor de la imagen
        this.inicializarForm(videogame); //Hacemos que se rellene el formulario con los datos del elemento
      });
  }


  inicializarForm(videogame: Videogame) {

    this.videogameForm.controls['name'].setValue(videogame.name);
    this.videogameForm.controls['mode'].setValue(videogame.mode);
    this.videogameForm.controls['engineId'].setValue(videogame.engineId); 
    this.videogameForm.controls['developmentStudioIds'].setValue(videogame.developmentStudioIds); 
    this.videogameForm.controls['genreIds'].setValue(videogame.genreIds);
    
  }


  onFormSubmit():void {
    console.log(this.videogameForm.getRawValue())
    // Si el form no es valido no seguir adelante
    if (!this.videogameForm.valid)  return;
      
    if (!this.isNewvideogame) {

      let request = {
        ...this.videogameForm.getRawValue()
      };

      this.videogameService.updateVideogame(request, this.id) //le tengo que pasar al updated videogame el valor actualizado del formulario, es por eso que le paso el objeto request
        .subscribe(() => this.goBack());
      
    }else {

      let request = {
        ...this.videogameForm.getRawValue()
      };
      console.log(request);
      this.videogameService.addVideogame(request) //le tengo que pasar al add videogame el valor actualizado del formulario, es por eso que le paso el objeto request
        .subscribe(() => this.goBack());
      
    }
  }  

  setImgPath(event:any){
    
    this.videogameForm.controls['imgPath'].setValue(this.transformPath(event.dbPath)); // Como event lo recogemos en la API como un objeto, tenemos que acceder a la propiedad dbPath, es por eso que no le pasamos a la funcion transformPath() solo el event, sino event.dbPath .

    this.img = this.videogameForm.controls['imgPath'].value;
  }

  transformPath(path:any){

    let modifyString = "https://localhost:44338/"+ path?.toString().replace(/\\/g,'/');

    return modifyString;

  }


  

}
