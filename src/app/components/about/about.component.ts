import { Component, OnInit } from '@angular/core';
import { ScreenWidth } from '@shared/enums';
import { ScreenService } from '@shared/services';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  ScreenWidth = ScreenWidth;

  constructor(public screenService: ScreenService) {}

  ngOnInit(): void {}
}
