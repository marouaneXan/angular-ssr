import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

const USERS_KEY = 'users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    let cachedUsers = localStorage.getItem(USERS_KEY);

    if (cachedUsers) {
      return of(JSON.parse(cachedUsers));
    } else {
      return this.http.get<any[]>(this.apiUrl).pipe(
        tap((users) => {
          localStorage.setItem(USERS_KEY, JSON.stringify(users));
        })
      );
    }
  }
}
