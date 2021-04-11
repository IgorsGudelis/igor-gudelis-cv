import { Component, Input } from '@angular/core';
import { showBottomToTopAnimation } from '@shared/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [showBottomToTopAnimation],
})
export class HomeComponent {
  @Input() isHomeContentVisible = false;
}
