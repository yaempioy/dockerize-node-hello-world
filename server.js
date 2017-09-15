const express = require('express')
const os = require('os');

const PORT = 8080
const app = express()
app.get('/', (req, res) => {
    res.send(`Final test Jenkins CI/CD, Docker Registry, Rancher Compose CLI, Rancher -> Jenkins Notification, I'm run on ${os.hostname()}`)
})
app.listen(PORT)
console.log(`Running on http://localhost:${PORT}`)
