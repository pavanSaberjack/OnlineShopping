const fs = require('fs');

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader("Content-Type", "text/html");
        res.write('<html>');
        res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send message toooo </button></form>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            // write to file
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    res.setHeader("Content-Type", "text/html");
    res.write('<html>');
    res.write('<head><title>hello</title></head>');
    res.write('<body><h1>Your message</h1></body>');
    res.write('</html>');
    res.end();
}

module.exports = requestHandler;