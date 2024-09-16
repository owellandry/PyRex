import { Renderer } from '../core/Renderer';

export class Component {
  private renderer = new Renderer();

  render(): HTMLElement {
    return this.renderer.render('div', 'Component content');
  }
}
