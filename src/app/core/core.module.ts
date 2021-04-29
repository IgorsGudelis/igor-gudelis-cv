import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CORE_COMPONENTS } from './components';

@NgModule({
  imports: [CommonModule],
  declarations: [...CORE_COMPONENTS],
  exports: [...CORE_COMPONENTS],
})
export class CoreModule {}
