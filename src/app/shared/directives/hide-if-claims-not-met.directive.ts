import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHideIfClaimsNotMet]'
})
export class HideIfClaimsNotMetDirective implements OnInit {

  @Input('appHideIfClaimsNotMet') claimReq!: Function;
  private authService = inject(AuthService);
  elementRef = inject(ElementRef);

  ngOnInit(): void {
    const claims = this.authService.getClaims();
    if(!this.claimReq(claims)){
      this.elementRef.nativeElement.style.display = 'none';
    }
  }

}
