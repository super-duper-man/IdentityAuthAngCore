import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { HideIfClaimsNotMetDirective } from '../../shared/directives/hide-if-claims-not-met.directive';
import { claimReq } from '../../shared/utils/calimReq-utils';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink,HideIfClaimsNotMetDirective],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  claimReqFn = claimReq;
  logout() {
    this.authService.deleteToken();
    this.router.navigateByUrl('/');
  }
}
