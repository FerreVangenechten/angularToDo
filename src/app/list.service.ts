import { Injectable } from '@angular/core';
import { List } from './list';


//Import the httpclien service to use de API
import { HttpClient, HttpHeaders } from '@angular/common/http';
//timer + switchmap --> for polling. when we add something to database we get them automatically
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ListService {

   //inject the httpclient in de operator to use the API
   constructor(private httpClient: HttpClient) {
  }

  getLists(): Observable<List[]> {
    return timer(1, 30000).pipe(switchMap(() => this.httpClient.get<List[]>("http://localhost:3000/lists")));
  }

  getListById(id: number): Observable<List> {
    return this.httpClient.get<List>("http://localhost:3000/lists/" + id);
  }

  postList(category: List): Observable<List> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<List>("http://localhost:3000/lists", category, {headers: headers});
}

  putList(id:number, category: List): Observable<List> {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');

      return this.httpClient.put<List>("http://localhost:3000/lists/" + id, category, {headers: headers});
  }

  deleteList(id: number): Observable<List> {
      return this.httpClient.delete<List>("http://localhost:3000/lists/" + id);
  }
}
