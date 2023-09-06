const { createServer: createHttpsServer } = require('https');
const next = require('next');
const fs = require('fs');

const env = process.env.NODE_ENV === 'production';
const app = next({ env });
const handle = app.getRequestHandler();
const PORT = 3333;

if (!fs.existsSync('C:/Program Files/Splunk/etc/auth/certificados-trial')) {
   console.error('\nError: Missing SSL certificates\n');
   process.exit();
}

app
   .prepare()
   .then(() => {
      const server = createHttpsServer(
         {
            key: fs.readFileSync('C:/Program Files/Splunk/etc/auth/certificados-trial/privkey.pem'),
            cert: fs.readFileSync('C:/Program Files/Splunk/etc/auth/certificados-trial/cert.pem'),
         },
         (req, res) => handle(req, res)
      );

      return server.listen(PORT, (err) => {
         if (err) throw err;
         console.log('> Ready on https://trial.soidemdt.com:3333')
      });
   })
   .catch((err) => {
      console.error(err);
   });