const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://backend.lendly-383321.wl.r.appspot.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove '/api' from the forwarded request path
      },
    })
  );
};