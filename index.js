const express = require('express')
const cors = require('cors')
const app = express()
const accountRoute = require('./routes/account')
const userRoute = require('./routes/user')
const debtRoute = require('./routes/debt')

const allowedOrigins = ['http://localhost:5173', 'https://i-oweyou.web.app']

app.use(express.json())
app.use(cors({ origin: allowedOrigins, credentials: true }))

app.use('/account', accountRoute)
app.use('/user', userRoute)
app.use('/debt', debtRoute)

app.listen(3000, () => {
  console.log(
    'Server is running on port http://localhost:3000 http://127.0.0.1:3000'
  )
})
