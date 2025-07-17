// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { LoginResponse, LoginResquest } from '../models/auth.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'https://reqres.in/api';
//   private tokenSubject = new BehaviorSubject<string | null>(null);

//   token$ = this.tokenSubject.asObservable();

//   login(credentials: LoginResquest): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
//   }

//   constructor() {}
// }
