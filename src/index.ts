import './styles/styles.css';
import { MyComponent } from './components/MyComponent';

const app = document.getElementById('app');
if (app) {
  const component = new MyComponent();
  app.appendChild(component.render());
}
