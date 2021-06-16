import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  Type,
  ViewContainerRef
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComponentFactoryService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  create<T>(componentType: Type<T>, container?: ViewContainerRef): ComponentRef<T> {
    const factory: ComponentFactory<T> = this.componentFactoryResolver.resolveComponentFactory(
      componentType
    );
    let componentRef: ComponentRef<T>;

    if (container) {
      componentRef = container.createComponent(factory);
    } else {
      const bodyElem = document.querySelector('body');

      componentRef = factory.create(this.injector);

      this.appRef.attachView(componentRef.hostView);

      bodyElem?.appendChild(componentRef.location.nativeElement);
    }

    return componentRef;
  }
}
