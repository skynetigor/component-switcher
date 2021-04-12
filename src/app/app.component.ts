import { Component } from '@angular/core';
import { FirstComponent, SecondComponent, ThirdComponent } from './components';
import { ComponentToSwitch } from './modules/component-switcher/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  componentsToSwitch: ComponentToSwitch[] = [
    {
      id: 'first',
      componentType: FirstComponent,
    },
    {
      id: 'second',
      componentType: SecondComponent
    },
    {
      id: 'third',
      componentType: ThirdComponent
    }
  ];

  isShown = true;

  click() {
    this.isShown = !this.isShown;
  }
}
