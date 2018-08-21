const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // 服务端支持路由遮盖
  server.get('/p/:id', (req, res) => {
    app.render(req, res, '/post', {title: req.params.id})
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3005, err => {
    if (err) throw err
    console.log('>>>Ready on localhost:3005...')
  })
}).catch(e => {
  console.error(e.stack)
  process.exit(1)
})
