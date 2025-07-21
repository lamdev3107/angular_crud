import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { LoginResponse, LoginResquest } from '../model/auth.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://reqres.in/api';
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  login(credentials: LoginResquest): Observable<LoginResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-api-key': 'reqres-free-v1',
      }),
    };
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      credentials,
      httpOptions
    );
  }
  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  get token$(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
