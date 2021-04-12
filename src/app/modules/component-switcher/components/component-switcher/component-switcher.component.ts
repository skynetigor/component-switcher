import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  StaticProvider,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentToSwitch } from '../../models';

@Component({
  selector: 'app-component-switcher',
  templateUrl: './component-switcher.component.html',
  styleUrls: ['./component-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentSwitcherComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  private indexedDictionary: { [key: string]: number };
  private componentRefs: ComponentRef<any>[];

  @ViewChild('host', { read: ViewContainerRef })
  private viewContainerRef: ViewContainerRef;

  currentComponent: ComponentToSwitch;
  currentIndex: number;
  previousIndex: number;

  @Input()
  render = true;

  @Input()
  componentsToSwitch: ComponentToSwitch[];

  injectProviders: StaticProvider[] = [
    { provide: ComponentSwitcherComponent, useValue: this },
  ];

  constructor(
    private cd: ChangeDetectorRef,
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnDestroy(): void {
    this.componentRefs.forEach((x, i) => {
      if (x) {
        console.log(x, `with index ${i} destroyed`);
        x.destroy();
      }
    });
  }

  ngAfterViewInit(): void {
    this.switch(0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('componentsToSwitch' in changes) {
      if (this.componentsToSwitch) {
        this.currentIndex = 0;
        this.componentRefs = new Array(this.componentsToSwitch.length);
        this.buildIndexedDictionary();
      }
    }
  }

  goNext() {
    if (this.currentIndex < this.componentsToSwitch.length - 1) {
      this.switch(this.currentIndex + 1);
    } else {
      this.switch(0);
    }

    this.cd.detectChanges();
  }

  goPrevious() {
    if (this.currentIndex > 0) {
      this.switch(this.currentIndex - 1);
    } else {
      this.switch(this.componentsToSwitch.length - 1);
    }

    this.cd.detectChanges();
  }

  goBack() {
    this.switch(this.previousIndex);
    this.cd.detectChanges();
  }

  goById(id: string) {
    let goToIndex = this.indexedDictionary[id];
    this.switch(goToIndex);
    this.cd.detectChanges();
  }

  ngOnInit() {}

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
