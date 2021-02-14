const http = require('http');
const fs = require('fs');
const port = 53134;
const url = require('url');
const fetch = require('node-fetch');
http.createServer((req, res) => {
	let responseCode = 404;
	let content = '404 Error';
    if(req.url) {
    const urlObj = url.parse(req.url, true);

    if (urlObj.query.code) {
	const accessCode = urlObj.query.code;
    const data = {
        client_id: '810226832208166966',
        client_secret: 'ogmTuRaZjmgCqLB5SqsDZk3jIWxsxyX-',
        grant_type: 'authorization_code',
        redirect_uri: 'https://discord.com/api/oauth2/authorize?client_id=810226832208166966&redirect_uri=https%3A%2F%2Fxtimestudio.github.io%2FstarveOauth2%2F&response_type=code&scope=identify%20email%20guilds%20guilds.join%20messages.read',
        code: accessCode,
        scope: 'identify, guilds, guilds.join, connections',
    };
    
    fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then(res => res.json())
        .then(console.log);
	console.log(`The access code is: ${accessCode}`);
    }

    if (urlObj.pathname === '/') {
	responseCode = 200;
	content = fs.readFileSync('./index.html');
    }
    }
	if (req.url === '/') {
		responseCode = 200;
		content = fs.readFileSync('./index.html');
	}

	res.writeHead(responseCode, {
		'content-type': 'text/html;charset=utf-8',
	});

	res.write(content);
	res.end();
})
	.listen(port);
