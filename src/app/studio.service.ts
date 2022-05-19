import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Studio } from "./studio";



@Injectable({
  providedIn: 'root'
})
export class StudioService {
  
  baseUrl = 'https://localhost:44338/api/DevelopmentStudios';

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

  /** GET studios from the server */
  getstudios(): Observable<Studio[]> {
    return this.http.get<Studio[]>(this.baseUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<Studio[]>('getstudios', [])) //The handleError() method reports the error and then returns an innocuous result so that the application keeps working.
      );
  }

  /** GET studio by id. Will 404 if id not found */
  getstudio(id: number): Observable<Studio> {

    //El url para conectarlo con la api tiene que cambiarse al de https://localhost:44338/api/studios/id
    // const url = `https://localhost:44338/${this.studiosUrl}/${id}`;

    return this.http.get<Studio>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError<Studio>(`getstudio id=${id}`))
    );
  }

  /** PUT: update the studio on the server */
  updatestudio(studio: Studio, id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, studio, this.httpOptions).pipe(
      catchError(this.handleError<any>('updatestudio'))
    );
  }

  /** DELETE: delete the studio from the server */
  deletestudio(id: number): Observable<Studio> {

    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<Studio>(url, this.httpOptions).pipe(
      catchError(this.handleError<Studio>('deletestudio'))
    );
  }

   /** POST: add a new studio to the server */
  addstudio(studio: Studio): Observable<Studio> {
    
    return this.http.post<Studio>(this.baseUrl, studio, this.httpOptions).pipe(
      catchError(this.handleError<Studio>('addstudio'))
    );
  }

  /* GET studios whose name contains search term */
  searchstudios(term: string): Observable<Studio[]> {
    
    if (!term.trim()) {
      // if not search term, return empty studio array.
      return of([]);
    }

    return this.http.get<Studio[]>(`${this.baseUrl}/search?name=${term}`).pipe(
      catchError(this.handleError<Studio[]>('searchstudios', []))
    );
  }
}
