import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleUserResponse, User, UserResponse } from '../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.apiUrl + '/users'; // Sử dụng apiUrl từ environment
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'x-api-key': 'reqres-free-v1',
    }),
  };
  getUsers(page: number = 1): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      `${this.baseUrl}?page=${page}`,
      this.httpOptions
    );
  }
  getUserById(id: number): Observable<SingleUserResponse> {
    return this.http.get<SingleUserResponse>(
      `${this.baseUrl}/${id}`,
      this.httpOptions
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user, this.httpOptions);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user, this.httpOptions);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, this.httpOptions);
  }
}
