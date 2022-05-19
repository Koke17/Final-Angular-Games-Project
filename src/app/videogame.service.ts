import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of, throwError } from 'rxjs';

import { Videogame } from "./videogame";

@Injectable({
  providedIn: 'root'
})
export class VideogameService {

  baseUrl = 'https://localhost:44338/api/Videogames';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    )
  };

  constructor(private http: HttpClient)
  { }

  
   /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET videogames from the server */
  getVideogames(): Observable<Videogame[]> {
    return this.http.get<Videogame[]>(this.baseUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<Videogame[]>('getVideogames', [])) //The handleError() method reports the error and then returns an innocuous result so that the application keeps working.
      );
  }

  /** GET videogame by id. Will 404 if id not found */
  getVideogame(id: number): Observable<Videogame> {

    //El url para conectarlo con la api tiene que cambiarse al de https://localhost:44338/api/videogames/id
    // const url = `https://localhost:44338/${this.videogamesUrl}/${id}`;

    return this.http.get<Videogame>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError<Videogame>(`getVideogame id=${id}`))
    );
  }

  /** PUT: update the videogame on the server */
  updateVideogame(videogame: Videogame, id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, videogame, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateVideogame'))
    );
  }

  /** DELETE: delete the videogame from the server */
  deleteVideogame(id: number): Observable<Videogame> {

    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<Videogame>(url, this.httpOptions).pipe(
      catchError(this.handleError<Videogame>('deleteVideogame'))
    );
  }

   /** POST: add a new videogame to the server */
  addVideogame(videogame: Videogame): Observable<Videogame> {
    
    return this.http.post<Videogame>(this.baseUrl, videogame, this.httpOptions).pipe(
      catchError(this.handleError<Videogame>('addVideogame'))
    );
  }

  /* GET videogames whose name contains search term */
  searchVideogames(term: string): Observable<Videogame[]> {
    
    if (!term.trim()) {
      // if not search term, return empty videogame array.
      return of([]);
    }

    return this.http.get<Videogame[]>(`${this.baseUrl}/search?name=${term}`).pipe(
      catchError(this.handleError<Videogame[]>('searchVideogames', []))
    );
  }
  
  
}
