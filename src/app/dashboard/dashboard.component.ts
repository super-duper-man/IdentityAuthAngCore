import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_KEY } from '../shared/constants';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  fullName: string = '';

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (res: any) => {
        this.fullName = res.fullName;
      },
      error: (err) => console.log(err)
    })
  }

  logout() {
    this.authService.deleteToken();
    this.router.navigateByUrl('/');
  }
}
