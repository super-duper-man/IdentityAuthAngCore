import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, inject } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  animations: [
    trigger('routerFaeIn', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('1s ease-in-out', style({ opacity: 1 })),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class UserComponent {
  private context = inject(ChildrenOutletContexts);
  getRouteUrl(){
    return this.context.getContext('primary')?.route?.url;
  }
}
