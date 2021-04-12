import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  StaticProvider,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[lazyComponent]',
})
export class LazyComponentDirective implements OnChanges, OnDestroy {
  private componentRef: ComponentRef<any>;

  @Input()
  lazyComponent: any;

  @Input()
  displayed: boolean;

  @Input()
  injectProviders: StaticProvider[];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}
  
  ngOnDestroy(): void {
    this.componentRef?.destroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('displayed' in changes) {
      if (this.displayed) {
        this.displayComponent();
      } else {
        this.hideComponent();
      }
    }
  }

  private displayComponent() {
    if (!this.componentRef) {
      this.createComponentRef();
    }

    this.viewContainerRef.insert(this.componentRef.hostView);
  }

  private hideComponent() {
    if (this.componentRef) {
      this.viewContainerRef.detach(0);
    }
  }

  private createComponentRef(): void {
    const injector = Injector.create({
      providers: [...this.injectProviders],
      parent: this.injector,
    });

    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(this.lazyComponent)
      .create(injector);
  }
}
