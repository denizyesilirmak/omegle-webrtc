const ws = require('ws')

const socketServer = new ws.Server({ server })

socketServer.on('connection', (client) => {
    console.log("connection")
})