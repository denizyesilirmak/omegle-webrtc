const ws = require('ws')
const http = require('http')
const express = require('express')
const app = express()

const server = http.createServer(app)
const SERVER_PORT = 8080
const socketServer = new ws.Server({ server })

socketServer.on('connection', (client) => {
    console.log("connection")
    client.send("nan")
})

server.listen(SERVER_PORT, () => {
    console.log(`Server started at ${SERVER_PORT}...`)
})