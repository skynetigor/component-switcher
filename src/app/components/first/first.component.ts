import { Component, OnInit } from '@angular/core';
import { ComponentSwitcherDirective } from 'src/app/modules/component-switcher/directives';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {

  constructor(public componentsSwitcher: ComponentSwitcherDirective) { 
  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    console.log('first destroyed')
  }
}
