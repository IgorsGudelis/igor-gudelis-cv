import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SHARED_COMPOENTS } from './components';

@NgModule({
  declarations: [...SHARED_COMPOENTS],
  imports: [CommonModule],
  exports: [...SHARED_COMPOENTS],
})
export class SharedModule {}
