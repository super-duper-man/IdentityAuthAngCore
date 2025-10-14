import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  getUserProfile() {
    return this.http.get(`${environment.API_BASE_URL}/UserProfile`);
  }
}
