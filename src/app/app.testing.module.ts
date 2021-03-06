import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

import { AppComponent } from './app.component';
import { APP_COMPONENTS } from './components';

export const AppTestingModule = {
  declarations: [AppComponent, ...APP_COMPONENTS],
  imports: [BrowserModule, BrowserAnimationsModule, CoreModule, SharedModule],
  providers: [],
};
