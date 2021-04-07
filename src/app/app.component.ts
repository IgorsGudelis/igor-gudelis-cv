import { Component } from '@angular/core';
import { ScreenService } from '@shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private screenService: ScreenService) {}
}
