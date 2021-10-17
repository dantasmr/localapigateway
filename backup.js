const express = require('express');
const httpProxy = require('express-http-proxy');
const hostcreator = require('./hostcreator.js');
const app = express();
const port = 3000;
const {
  GOOGLE_API_LANGUAGE_URL,
  PRODUCTS_API_URL,
} = require('./URLs');


const productsServiceProxy = httpProxy(PRODUCTS_API_URL);

//app.get('/', (req, res) => res.send('Hello Gateway API'));


app.use('/', proxy(selectProxyHost));

app.get('/*', function (req, res, next) {
    
    const apiGateway = hostcreator(req.url);
    const googleServiceProxy = httpProxy(apiGateway.host);
    req.url = apiGateway.basePath;
     googleServiceProxy(req, res, next, {
        intercept: function(proxyRes, proxyResData, req, res, cb) {
          data = JSON.parse(proxyResData.toString('utf8'));
          console.log(data);
          cb(null,  proxyResData);
        }
      });



});
app.get('/products', (req, res, next) => productsServiceProxy(req, res, next));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));