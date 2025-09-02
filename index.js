const express = require('express')
const app = express()
const accountRoute = require('./routes/account')

app.use(express.json())

app.use('/account', accountRoute)

app.listen(3000, () => {
  console.log(
    'Server is running on port http://localhost:3000 http://127.0.0.1:3000'
  )
})
