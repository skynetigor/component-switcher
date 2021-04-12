import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  StaticProvider,
} from '@angular/core';
import { ComponentToSwitch } from '../../models';

@Component({
  selector: 'app-component-switcher',
  templateUrl: './component-switcher.component.html',
  styleUrls: ['./component-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentSwitcherComponent implements OnInit, OnChanges {
  private indexedDictionary: { [key: string]: number }
  currentComponent: ComponentToSwitch;
  currentIndex: number;

  @Input()
  componentsToSwitch: ComponentToSwitch[];

  injectProviders: StaticProvider[] = [
    { provide: ComponentSwitcherComponent, useValue: this },
  ];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('componentsToSwitch' in changes) {
      if (this.componentsToSwitch) {
        this.currentIndex = 0;
        this.buildIndexedDictionary();
      }
    }
  }

  goNext() {
    if(this.currentIndex < (this.componentsToSwitch.length - 1)) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }

    this.cd.detectChanges();
  }

  goPrevious() {
    if(this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.componentsToSwitch.length - 1;
    }

    this.cd.detectChanges();
  }

  goById(id: string) {
    this.currentIndex = this.indexedDictionary[id];
  }

  ngOnInit() {}

  private buildIndexedDictionary(): void {
    this.indexedDictionary = {};

    this.componentsToSwitch.forEach((x, index) => this.indexedDictionary[x.id] = index);
  }
}
