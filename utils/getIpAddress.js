const os = require('os');
const { logMessage } = require('./logMessage');
const colors = require('./colors');

function getIpAddress() {
    const interfaces = os.networkInterfaces();
    for (let iface of Object.values(interfaces)) {
        for (let ifaceInfo of iface) {
            if (ifaceInfo.family === 'IPv4' && !ifaceInfo.internal) {
                return ifaceInfo.address;
            }
        }
    }
    logMessage(colors.error, 'No valid IP address found.');
    return 'localhost';
}

module.exports = getIpAddress;
