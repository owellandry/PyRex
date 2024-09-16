export class Renderer {
  render(element: string, content: string): HTMLElement {
    const el = document.createElement(element);
    el.innerHTML = content;
    return el;
  }
}
