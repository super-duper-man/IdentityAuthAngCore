import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_KEY } from '../shared/constants';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  logout() {
    this.authService.deleteToken();
    this.router.navigateByUrl('/');
  }
}
