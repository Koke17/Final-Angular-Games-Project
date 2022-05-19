import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { VideogamesComponent } from './videogames/videogames.component';
import { EnginesComponent } from './engines/engines.component';
import { StudiosComponent } from './studios/studios.component';
import { GenresComponent } from './genres/genres.component';
import { GenreDetalleComponent } from './genre-detalle/genre-detalle.component';
import { GenreSearchComponent } from './genre-search/genre-search.component';
import { StudioDetalleComponent } from './studio-detalle/studio-detalle.component';
import { EngineDetalleComponent } from './engine-detalle/engine-detalle.component';
import { VideogameDetalleComponent } from './videogame-detalle/videogame-detalle.component';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from "@angular/common/http";

/** Forms **/ 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";

/*para el ng-select*/
import { NgSelectModule,NgOption } from "@ng-select/ng-select";
import { StudioSearchComponent } from './studio-search/studio-search.component';
import { EngineSearchComponent } from './engine-search/engine-search.component';
import { VideogameSearchComponent } from './videogame-search/videogame-search.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VideogamesComponent,
    EnginesComponent,
    StudiosComponent,
    GenresComponent,
    GenreDetalleComponent,
    GenreSearchComponent,
    StudioDetalleComponent,
    EngineDetalleComponent,
    VideogameDetalleComponent,
    StudioSearchComponent,
    EngineSearchComponent,
    VideogameSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
