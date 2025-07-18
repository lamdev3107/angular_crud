import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleUserResponse, User, UserResponse } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://reqres.in/api/users';
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'x-api-key': 'reqres-free-v1',
    }),
  };
  getUsers(page: number = 1): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      `${this.apiUrl}?page=${page}`,
      this.httpOptions
    );
  }
  getUserById(id: number): Observable<SingleUserResponse> {
    return this.http.get<SingleUserResponse>(
      `${this.apiUrl}/${id}`,
      this.httpOptions
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, this.httpOptions);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, this.httpOptions);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions);
  }
}
