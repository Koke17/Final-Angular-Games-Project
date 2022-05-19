import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location, NgClass } from '@angular/common';

import { Studio } from "../studio";
import { StudioService } from '../studio.service';

/*Para validar forms*/
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-studio-detalle',
  templateUrl: './studio-detalle.component.html',
  styleUrls: ['./studio-detalle.component.css']
})
export class StudioDetalleComponent implements OnInit {


  studio: Studio | undefined; 
  id: number = 0;
  isNewstudio = false;

  studioForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    employees: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    foundationDate: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
   });

  constructor(
    private route: ActivatedRoute,
    private studioService: StudioService,
    private location: Location
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id')); //cogemos el id de la ruta
    if (!id) {
      this.isNewstudio = true;
      return;
    }
    this.id = id;
  }

  ngOnInit(): void {
    if (!this.isNewstudio) {
      this.getstudio(); // Al iniciarse la pagina que se ejecute el metodo
    }
  }

  goBack(): void {
    this.location.back();
  }

  getstudio(){
    this.studioService.getstudio(this.id)
      .subscribe(studio => { //Nos suscribimos porque queremos recibir la informacion de manera asincrona del Observable de tipo studio
        this.studio = studio;
        this.inicializarForm(studio); //hacemos que se rellene el formulario con los datos del elemento
      });
  }

  inicializarForm(studio: Studio) {
    console.log(studio)
    this.studioForm.controls['name'].setValue(studio.name);
    this.studioForm.controls['employees'].setValue(studio.employees);
    this.studioForm.controls['foundationDate'].setValue(studio.foundation_Date != null ? new Date(studio.foundation_Date).toISOString().substring(0, 10) : new Date()); // BUSCA COMO ASIGNAR UN DATO DE TIPO FECHA A UN INPUT DE TIPO FECHA
  }

  onFormSubmit():void {
    
    // Si el elemento imagen no tiene valor no seguir adelante
    if (!this.studioForm.valid)  return;
      
    if (!this.isNewstudio) {

      let fechaMin = new Date(1960,1,1) //minFecha creacion Studio
      let fechaMax = new Date(); //maxFecha creacion studio (actual)

      if (this.studioForm.controls['employees'].value <= 0) return; //El valor de employee no puede ser negativo

      if (this.studioForm.controls['foundationDate'].value < fechaMin || this.studioForm.controls['foundationDate'].value > fechaMax) return; //El valor de foundation teiene que estar comprendido entre 1960 y la fecha actual


      let request = {
        ...this.studioForm.getRawValue()
      };

      this.studioService.updatestudio(request, this.id) //le tengo que pasar al updated studio el valor actualizado del formulario, es por eso que le paso el objeto request
        .subscribe(() => this.goBack());
      
    }else {
      let request = {
        ...this.studioForm.getRawValue()
      };

      this.studioService.addstudio(request) //le tengo que pasar al add studio el valor actualizado del formulario, es por eso que le paso el objeto request
        .subscribe(() => this.goBack());
      
    }
  }
}
