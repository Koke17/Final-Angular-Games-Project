import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Genre } from "./genre";

@Injectable({
  providedIn: 'root'
})
export class GenreService {


  baseUrl = 'https://localhost:44338/api/Genres';

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

  /** GET genres from the server */
  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.baseUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<Genre[]>('getGenres', [])) //The handleError() method reports the error and then returns an innocuous result so that the application keeps working.
      );
  }

  /** GET genre by id. Will 404 if id not found */
  getGenre(id: number): Observable<Genre> {

    //El url para conectarlo con la api tiene que cambiarse al de https://localhost:44338/api/genres/id
    // const url = `https://localhost:44338/${this.genresUrl}/${id}`;

    return this.http.get<Genre>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError<Genre>(`getGenre id=${id}`))
    );
  }

  /** PUT: update the genre on the server */
  updateGenre(genre: Genre,id:number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, genre, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateGenre'))
    );
  }

  /** DELETE: delete the genre from the server */
  deleteGenre(id: number): Observable<Genre> {

    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<Genre>(url, this.httpOptions).pipe(
      catchError(this.handleError<Genre>('deleteGenre'))
    );
  }

   /** POST: add a new genre to the server */
   addGenre(genre: Genre): Observable<Genre> {
    
    return this.http.post<Genre>(this.baseUrl, genre, this.httpOptions).pipe(
      catchError(this.handleError<Genre>('addGenre'))
    );
  }

  /* GET genres whose name contains search term */
  searchGenres(term: string): Observable<Genre[]> {
    
    if (!term.trim()) {
      // if not search term, return empty genre array.
      return of([]);
    }

    return this.http.get<Genre[]>(`${this.baseUrl}/search?name=${term}`).pipe(
      catchError(this.handleError<Genre[]>('searchGenres', []))
    );
  }


}
