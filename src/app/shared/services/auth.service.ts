import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TOKEN_KEY } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = "http://localhost:5146/api"
  constructor(private http: HttpClient) { }

  createUser(formData: any) {
    return this.http.post(`${this.baseUrl}/signup`, formData);
  }

  signin(formData: any) {
    return this.http.post(`${this.baseUrl}/signin`, formData);
  }

  isLoggedIn() {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  }

  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
}
