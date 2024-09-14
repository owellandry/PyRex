const colors = require('./colors');

const logMessage = (type, message) => {
    let color;
    switch (type) {
        case 'correcto':
            color = colors.fgGreen;
            break;
        case 'error':
            color = colors.fgRed;
            break;
        case 'advertencia':
            color = colors.fgYellow;
            break;
        default:
            color = colors.reset;
    }
    console.log(`${color}[SERVIDOR] ${type}: ${message}${colors.reset}`);
};

module.exports = logMessage;
