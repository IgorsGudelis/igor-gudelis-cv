import {
  ComponentRef,
  Injectable,
  Renderer2,
  RendererFactory2,
  Type
} from '@angular/core';
import { Subscription } from 'rxjs';

import { ComponentFactoryService } from './component-factory.service';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogRef!: ComponentRef<any> | null;
  private dialogCloseSub!: Subscription;
  private renderer!: Renderer2;

  get dialogInstance(): any {
    return this.dialogRef?.instance;
  }

  constructor(
    private componentFactoryService: ComponentFactoryService,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  closeDialog(): void {
    this.destroyDialogSources();
  }

  openDialog<T>(componentType: Type<T>): T | void {
    if (!this.dialogRef) {
      const bodyElem = document.querySelector('body');

      this.renderer.setStyle(bodyElem, 'overflow', 'hidden');
      this.dialogRef = this.componentFactoryService.create(componentType);
      this.dialogCloseSub?.unsubscribe();
      this.dialogCloseSub = this.dialogInstance.afterClose$?.subscribe(() => {
        this.destroyDialogSources();
        this.renderer.setStyle(bodyElem, 'overflow', 'auto');
      });

      return this.dialogInstance;
    }
  }

  private destroyDialogSources(): void {
    this.dialogCloseSub?.unsubscribe();
    this.dialogRef?.destroy();
    this.dialogRef = null;
  }
}
