import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of, throwError } from 'rxjs';

import { Engine } from "./engine";


@Injectable({
  providedIn: 'root'
})
export class EngineService {

  baseUrl = 'https://localhost:44338/api/Engines';

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

  /** GET engines from the server */
  getEngines(): Observable<Engine[]> {
    return this.http.get<Engine[]>(this.baseUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<Engine[]>('getEngines', [])) //The handleError() method reports the error and then returns an innocuous result so that the application keeps working.
      );
  }

  /** GET engine by id. Will 404 if id not found */
  getEngine(id: number): Observable<Engine> {

    //El url para conectarlo con la api tiene que cambiarse al de https://localhost:44338/api/engines/id
    // const url = `https://localhost:44338/${this.enginesUrl}/${id}`;

    return this.http.get<Engine>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError<Engine>(`getEngine id=${id}`))
    );
  }

  /** PUT: update the engine on the server */
  updateEngine(engine: Engine, id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, engine, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateEngine'))
    );
  }

  /** DELETE: delete the engine from the server */
  deleteEngine(id: number): Observable<Engine> {

    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<Engine>(url, this.httpOptions).pipe(
      catchError(this.handleError<Engine>('deleteEngine'))
    );
  }

   /** POST: add a new engine to the server */
  addEngine(engine: Engine): Observable<Engine> {
    
    return this.http.post<Engine>(this.baseUrl, engine, this.httpOptions).pipe(
      catchError(this.handleError<Engine>('addEngine'))
    );
  }

  /* GET engines whose name contains search term */
  searchEngines(term: string): Observable<Engine[]> {
    
    if (!term.trim()) {
      // if not search term, return empty engine array.
      return of([]);
    }

    return this.http.get<Engine[]>(`${this.baseUrl}/search?name=${term}`).pipe(
      catchError(this.handleError<Engine[]>('searchEngines', []))
    );
  }
}
