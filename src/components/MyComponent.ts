import { Component } from './Component';

export class MyComponent extends Component {
  render(): HTMLElement {
    const el = super.render();
    el.innerHTML = 'MyComponent content';
    return el;
  }
}
