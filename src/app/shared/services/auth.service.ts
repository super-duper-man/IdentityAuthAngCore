import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
