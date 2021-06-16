import { ComponentRef, Injectable, Type } from '@angular/core';
import { Subscription } from 'rxjs';

import { ComponentFactoryService } from './component-factory.service';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogRef!: ComponentRef<any> | null;
  private dialogCloseSub!: Subscription;

  get dialogInstance(): any {
    return this.dialogRef?.instance;
  }

  constructor(private componentFactoryService: ComponentFactoryService) {}

  closeDialog(): void {
    this.destroyDialogSources();
  }

  openDialog<T>(componentType: Type<T>): T | void {
    if (!this.dialogRef) {
      this.dialogRef = this.componentFactoryService.create(componentType);
      this.dialogCloseSub?.unsubscribe();
      this.dialogCloseSub = this.dialogInstance.afterClose$?.subscribe(() => {
        this.destroyDialogSources();
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
