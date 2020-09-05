const net = require('net');
const { exec } = require('child_process');

const port = process.env.PORT ? (Number(process.env.PORT) - 100) : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => client.connect({port: port}, () => {
    client.end();
    if(!startedElectron) {
        startedElectron = true;
        const startElectron = () => {
            console.log('starting electron');
            exec('npm run electron');
        };
        setTimeout(startElectron, 12000);
    }
}
);

tryConnection();

client.on('error', (error) => {
    console.log('error, retrying connection');
    setTimeout(tryConnection, 1000);
});
