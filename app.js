const express = require('express');
const child_process = require('child_process')

const app = express();

app.get('/*', (req, res) => {
    const ipInfo = `<b>Access URI:</b> ${req.headers.host}${req.originalUrl} <br /> <b> Client IP:</b> ${req.ip}`
    console.log(req);
    console.log('clientInfo', ipInfo);
    res.send(ipInfo);

})

const ips = ['localhost', '::', '127.0.0.1'];
const ports = [];
ips.forEach((ip, i) => {
    const port = 3000 + i;
    app.listen(port, ip, () => {
        ports.push(port);
        console.log(`listen on: http://${ip}:${port}`);
    })
});

// open test
const openBrowser = () => {
    ips.forEach((ip, i) => {
        ports.forEach(it => {
            if (ip === '::') ip = '[::]';
            const cmd = `open http://${ip}:${it}`;
            console.log(`open uri ${cmd}`);
            try {
                child_process.execSync(cmd)
            } catch(err) { console.log(err); }
        })
    })
}

// setTimeout(openBrowser, 2000)
