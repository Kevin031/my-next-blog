const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const pathMatch = require('path-match')

const port = parseInt(process.env.PORT, 10) || 5000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const route = pathMatch()

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const { pathname, query } = parse(req.url, true)
      if (route('/posts/:id')(pathname)) {
        app.render(req, res, '/posts', Object.assign(route('/posts/:id')(pathname), query))
      } else if (route('/post/:id')(pathname)) {
        app.render(req, res, '/post', Object.assign(route('/post/:id')(pathname), query))
      } else {
        handle(req, res)
      }
      // assigning `query` into the params means that we still
      // get the query string passed to our application
      // i.e. /blog/foo?show-comments=true
    })
      .listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
      })
  })