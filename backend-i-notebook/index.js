const connectToMongosatyam = require('./db');
const express = require('express')
var cors = require('cors')


connectToMongosatyam();
const app = express()
const port = 5000

app.use(cors())

app.use(express.json())
// available routes
app.use("/api/Auth",require("./routes/Auth"))
app.use("/api/Notes",require("./routes/Notes"))

app.get('/', (req, res) => {
  res.send('Hello Harry!')
})

app.listen(port, () => {
  console.log(`i-Notebook backend lisitening at http://localhost:${port}`)
})