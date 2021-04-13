import {
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  StaticProvider,
  ViewContainerRef,
} from '@angular/core';
import { ComponentToSwitch } from '../../models';

@Directive({
  selector: '[componentsToSwitch]',
})
export class ComponentSwitcherDirective implements OnChanges, OnDestroy {
  @Input()
  componentsToSwitch: ComponentToSwitch[];

  private indexedDictionary: { [key: string]: number };
  private componentRefs: ComponentRef<any>[];

  currentComponent: ComponentToSwitch;
  currentIndex: number;
  previousIndex: number;

  injectProviders: StaticProvider[] = [
    { provide: ComponentSwitcherDirective, useValue: this },
  ];

  constructor(
    private cd: ChangeDetectorRef,
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnDestroy(): void {
    this.componentRefs.forEach((x, i) => {
      if (x) {
        console.log(x, `with index ${i} destroyed`);
        x.destroy();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('componentsToSwitch' in changes) {
      if (this.componentsToSwitch) {
        this.currentIndex = 0;
        this.componentRefs = new Array(this.componentsToSwitch.length);
        this.buildIndexedDictionary();
        this.switch(0);
      }
    }
  }

  goNext(): void {
    if (this.currentIndex < this.componentsToSwitch.length - 1) {
      this.switch(this.currentIndex + 1);
    } else {
      this.switch(0);
    }

    this.cd.detectChanges();
  }

  goPrevious(): void {
    if (this.currentIndex > 0) {
      this.switch(this.currentIndex - 1);
    } else {
      this.switch(this.componentsToSwitch.length - 1);
    }

    this.cd.detectChanges();
  }

  goBack(): void {
    this.switch(this.previousIndex);
    this.cd.detectChanges();
  }

  goById(id: string): void {
    let goToIndex = this.indexedDictionary[id];
    this.switch(goToIndex);
    this.cd.detectChanges();
  }

  private switch(index: number) {
    this.previousIndex = this.currentIndex;
    this.currentIndex = index;

    if (this.viewContainerRef.length) {
      this.viewContainerRef.detach(0);
    }

    this.viewContainerRef.insert(
      this.getOrCreateComponentRef(
        index,
        this.componentsToSwitch[index].componentType
      ).hostView
    );
  }

  private buildIndexedDictionary(): void {
    this.indexedDictionary = {};

    this.componentsToSwitch.forEach(
      (x, index) => (this.indexedDictionary[x.id] = index)
    );
  }

  private getOrCreateComponentRef(
    index: number,
    compType: any
  ): ComponentRef<any> {
    if (this.componentRefs[index]) {
      return this.componentRefs[index];
    }

    const injector = Injector.create({
      providers: [...this.injectProviders],
      parent: this.injector,
    });

    const cref = this.componentFactoryResolver
      .resolveComponentFactory(compType)
      .create(injector);
    this.componentRefs[index] = cref;
    return cref;
  }
}
