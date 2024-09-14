// Simulación de creación de root
function createRoot(container) {
    return {
        render: (element) => {
            container.innerHTML = '';
            container.appendChild(element);
        },
    };
}

function App() {
    const element = document.createElement('div');
    const title = document.createElement('h1');
    title.textContent = "¡Hola, Mundo!";

    const description = document.createElement('p');
    description.textContent = "Bienvenido a tu aplicación hecha desde cero.";

    element.appendChild(title);
    element.appendChild(description);

    return element;
}

// Seleccionar el contenedor
const container = document.getElementById('app');
const root = createRoot(container);

// Renderizar el componente App
root.render(App());
