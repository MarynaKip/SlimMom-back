const app = require('../app')
require('dotenv').config()
const PORT = process.env.PORT || 3000

const { connectMongo } = require('../src/db/connection')

const start = async () => {
  try {
    await connectMongo()

    app.listen(PORT, (err) => {
      if (err) {
        console.error('Error at server launch:', err)
      }
      console.log(`Database connection successful at port ${PORT}`)
    })
  } catch (err) {
    console.error(`Failed to launch application with error ${err.message}`)
    process.exit(1)
  }
}

start()
