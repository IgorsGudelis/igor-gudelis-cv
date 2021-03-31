import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { APP_COMPONENTS } from './components';

@NgModule({
  declarations: [AppComponent, ...APP_COMPONENTS],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
