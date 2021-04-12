import { CommonModule } from '@angular/common';

import { SHARED_COMPOENTS } from './components';

export const SharedTestingModule = {
  declarations: [...SHARED_COMPOENTS],
  imports: [CommonModule],
};
