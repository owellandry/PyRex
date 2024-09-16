import { Component } from '../src/components/Component';

test('Component renders correctly', () => {
  const component = new Component();
  const element = component.render();
  expect(element.tagName).toBe('DIV');
  expect(element.innerHTML).toBe('Component content');
});
