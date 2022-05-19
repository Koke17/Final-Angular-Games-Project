import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { EnginesComponent } from './engines/engines.component';
import { GenreDetalleComponent } from './genre-detalle/genre-detalle.component';
import { GenresComponent } from './genres/genres.component';
import { HomeComponent } from './home/home.component';
import { StudioDetalleComponent } from './studio-detalle/studio-detalle.component';
import { StudiosComponent } from './studios/studios.component';
import { VideogamesComponent } from './videogames/videogames.component';
import { EngineDetalleComponent } from './engine-detalle/engine-detalle.component';
import { VideogameDetalleComponent } from './videogame-detalle/videogame-detalle.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'videogames', component: VideogamesComponent },
  { path: 'videogames/:id', component: VideogameDetalleComponent },
  { path: 'engines', component: EnginesComponent },
  { path: 'engines/:id', component: EngineDetalleComponent }, // Recuerda cambiar el EnginesComponent por el EngineDetalleComponent
  { path: 'studios', component: StudiosComponent },
  { path: 'studios/:id', component: StudioDetalleComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'genres/:id', component: GenreDetalleComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }