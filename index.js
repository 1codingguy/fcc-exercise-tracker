require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./db/connect')

app.use(cors())

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)

    app.listen(port, () => {
      console.log(
        `DB connection successful. Your app is listening on port ${port}`
      )
    })
  } catch (error) {
    console.log(error)
  }
}

start()
