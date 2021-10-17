const httpProxy = require('express-http-proxy');
const logger = require('./logger');

module.exports = function (host, method) { 

    const tmp_partes = host.split("/");
    const tmp_host = tmp_partes[1] + "//" + tmp_partes[3];
    const tmp_host_key = "/"+tmp_host;
    const tmp_basePath = host.replace(tmp_host_key,"");

    const apiServiceProxy = httpProxy(tmp_host, {
        userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {

          const logAPI = {
              "api":  tmp_host + tmp_basePath,
              "method": method,
              "headers": userReq.headers,
              "query": userReq.query,
              "responseHeaders": proxyRes.headers,
              "responseBody": JSON.parse(proxyResData.toString('utf8')),
              "statusCode": proxyRes.statusCode
          }  

          logger.info(logAPI);
          return proxyResData;
        }
      });
    
      let api_gateway = {
        "serviceProxy": apiServiceProxy,
        "basePath": tmp_basePath
      }

    return api_gateway

};