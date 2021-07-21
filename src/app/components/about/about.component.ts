import { Component } from '@angular/core';
import { ScreenWidth } from '@shared/enums';
import { ScreenService } from '@shared/services';
import {
  GoogleAnalyticsService
} from '@shared/services/google-analytics.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  ScreenWidth = ScreenWidth;

  constructor(
    public screenService: ScreenService,
    private gaService: GoogleAnalyticsService
  ) {}

  onDownloadCV(): void {
    this.gaService.sendEvent('DOWNLOAD_CV', {
      event_category: 'DOWNLOAD',
    });
  }
}
