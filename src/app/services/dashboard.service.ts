import { Injectable } from '@angular/core';
import { tap, catchError, takeLast } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';


import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToDo } from '../dashboard/todos';
import { TodoData } from '../dashboard/todos-data';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private todosData: string = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {

  }

  public patchPost(id) {
    return this.http.patch<ToDo[]>(this.todosData + '/' + id, JSON.stringify({ completed: true }));
  }

  public updatePost(id) {
    this.http.patch(this.todosData, JSON.stringify({ completed: true }))
      .subscribe(response => {
        console.log(response);
      });
  }

  public getData() {
    return this.http.get<ToDo[]>(this.todosData);
  }

  public addPost() {
        this.http.post<any>('https://jsonplaceholder.typicode.com/posts', { title: 'Angular POST Request Example' }).subscribe(data => {
            console.log(data);
        })
  }

  public deletePost() {
    this.http.delete('https://jsonplaceholder.typicode.com/posts/1')
        .subscribe(() => 'Delete successful');
  }



  // todos$ = this.http.get<ToDo[]>(this.todosData)
  // .pipe(
  //   tap(data => console.log('Products: ', JSON.stringify(data))),
  //   catchError(this.handleError)
  // );



  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
