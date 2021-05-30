import { CommonModule } from '@angular/common';

import { SHARED_COMPONENTS } from './components';

export const SharedTestingModule = {
  declarations: [...SHARED_COMPONENTS],
  imports: [CommonModule],
};
