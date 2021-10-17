const express = require('express');
const httpProxy = require('express-http-proxy');
const logger = require('./logger');
const proxy_gateway = require('./proxy_gateway.js');

const app = express();
const port = 3000;


app.get('/*', function (req, res, next) {
    
    const apiGateway = proxy_gateway(req.url, "get");
    req.url = apiGateway.basePath;
    apiGateway.serviceProxy(req, res, next );

});

app.post('/*', function (req, res, next) {
    
    const apiGateway = proxy_gateway(req.url, "post");
    req.url = apiGateway.basePath;
    apiGateway.serviceProxy(req, res, next );

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));