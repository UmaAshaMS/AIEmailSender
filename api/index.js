const dotenv = require('dotenv')
dotenv.config(); 

const express = require('express')
const cors = require('cors')

const emailRoutes = require('./routes/emailRoutes')

const app = express()



app.use(cors({
    origin: ['https://ai-email-sender-sigma.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'OPTIONS'], 
    credentials: true,             
  }));

app.use(express.json())

app.use('/api/email', emailRoutes)

app.get('/',(req, res) => {
    res.send('AI')
})

app.options("*", cors()) 

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})