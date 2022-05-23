import { Component, OnInit } from '@angular/core';

import { Location, NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Engine } from "../engine";
import { EngineService } from '../engine.service';

import { StudioService } from "../studio.service";

/*Para validar forms*/
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-engine-detalle',
  templateUrl: './engine-detalle.component.html',
  styleUrls: ['./engine-detalle.component.css']
})
export class EngineDetalleComponent implements OnInit {

  engine: Engine | undefined; 
  studioList: any;

  id: number = 0;
  isNewengine = false;
  fecha: Date | undefined;

  img: string | undefined;

  engineForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    programmingLanguage: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
    developmentStudioId: new FormControl('', [Validators.required]),
    imgPath: new FormControl(''),
   });

  constructor(
    private route: ActivatedRoute,
    private EngineService: EngineService,
    private location: Location,
    private studioService: StudioService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id')); //cogemos el id de la ruta
    if (!id) {
      this.isNewengine = true;
      return;
    }
    this.id = id;
  }

  ngOnInit(): void {
    if (!this.isNewengine) {
      this.getEngine(); // Al iniciarse la pagina que se ejecute el metodo
    }
    this.getStudios();
  }

  getStudios(){
    this.studioService.getstudios().subscribe(studios => {
      console.log(studios);
      this.studioList = studios;
    });
  }

  goBack(): void {
    this.location.back();
  }

  getEngine(){
    this.EngineService.getEngine(this.id)
      .subscribe(engine => { //Nos suscribimos porque queremos recibir la informacion de manera asincrona del Observable de tipo engine
        this.engine = engine;
        this.img = engine.imgPath;
        this.inicializarForm(engine); //hacemos que se rellene el formulario con los datos del elemento
      });
  }

  inicializarForm(engine: Engine) {

    this.engineForm.controls['name'].setValue(engine.name);
    this.engineForm.controls['programmingLanguage'].setValue(engine.programmingLanguage);
    this.engineForm.controls['developmentStudioId'].setValue(engine.developmentStudioId); 
    
  }

  onFormSubmit():void {
    console.log(this.engineForm.getRawValue())
    // Si el form no es valido no seguir adelante
    if (!this.engineForm.valid)  return;
      
    if (!this.isNewengine) {

      let request = {
        ...this.engineForm.getRawValue()
      };

      this.EngineService.updateEngine(request, this.id) //le tengo que pasar al updated engine el valor actualizado del formulario, es por eso que le paso el objeto request
        .subscribe(() => this.goBack());
      
    }else {

      let request = {
        ...this.engineForm.getRawValue()
      };
      console.log(request);
      this.EngineService.addEngine(request) //le tengo que pasar al add engine el valor actualizado del formulario, es por eso que le paso el objeto request
        .subscribe(() => this.goBack());
      
    }
  }

  setImgPath(event:any){
    
    this.engineForm.controls['imgPath'].setValue(this.transformPath(event.dbPath)); // Como event lo recogemos en la API como un objeto, tenemos que acceder a la propiedad dbPath, es por eso que no le pasamos a la funcion transformPath() solo el event, sino event.dbPath .

    this.img = this.engineForm.controls['imgPath'].value;
  }

  transformPath(path:any){

    let modifyString = "https://localhost:44338/"+ path?.toString().replace(/\\/g,'/');

    return modifyString;

  }

}
