import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SHARED_COMPONENTS } from './components';

export const SharedTestingModule = {
  declarations: [...SHARED_COMPONENTS],
  imports: [BrowserAnimationsModule, CommonModule],
};
