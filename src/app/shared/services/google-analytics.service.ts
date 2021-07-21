import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  private trackerId!: string;

  constructor() {
    this.trackerId = environment.googleAnalyticsId;
    this.initialize();
  }

  sendEvent(
    action: string,
    eventData: { event_category: string; event_label?: string; value?: number }
  ): void {
    this.send('event', action, eventData);
  }

  private attachExternalAPIScript(): void {
    const gaScript = document.createElement('script');

    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${this.trackerId}`;
    document.head.appendChild(gaScript);
  }

  private initialize(): void {
    if (this.trackerId) {
      (window as any).dataLayer = (window as any).dataLayer || [];

      this.attachExternalAPIScript();
      this.send('js', new Date());
      this.send('config', this.trackerId);
    }
  }

  private send(...args: any[]): void {
    if (this.trackerId) {
      (window as any).dataLayer.push(arguments);
    }
  }
}
