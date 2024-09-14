// reload.js
const ws = new WebSocket(`ws://${window.location.host}`);

ws.onmessage = function (event) {
    if (event.data === 'reload') {
        console.log('Changes detected, reloading page...');
        window.location.reload();
    }
};

ws.onopen = function () {
    console.log('WebSocket connection established');
};

ws.onclose = function () {
    console.log('WebSocket connection closed');
};
