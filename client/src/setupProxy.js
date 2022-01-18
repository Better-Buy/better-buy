const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/v1/products/trendingViewed(categoryId=pcmcat209400050001)', {
      target: 'https://api.bestbuy.com',
      changeOrigin: true,
    })
  )
}
