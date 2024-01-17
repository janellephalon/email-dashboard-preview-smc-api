const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.get('/token', async (req, res) => {
  try {
    const response = await axios.post('https://api.datamotion.com/SMC/Messaging/v3/token', {
      grant_type: 'client_credentials',
      client_id: process.env.CLIENT_ID, // assuming you have named it CLIENT_ID in .env
      client_secret: process.env.CLIENT_SECRET, // assuming you have named it CLIENT_SECRET in .env
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching token', error: error.response.data })
  }
})

app.get('/messages', async (req, res) => {
  try {
     const tokenResponse = await axios.post('https://api.datamotion.com/SMC/Messaging/v3/token', {
      grant_type: 'client_credentials',
      client_id: process.env.CLIENT_ID, // assuming you have named it CLIENT_ID in .env
      client_secret: process.env.CLIENT_SECRET, // assuming you have named it CLIENT_SECRET in .env
    })

    const messagesResponse = await axios.get('https://api.datamotion.com/SMC/Messaging/v3/content/messages/?folderId=1&pageSize=10&pageNumber=1&sortDirection=DESC&metadata=true', {
        headers: {
          Authorization: `Bearer ${tokenResponse.data.access_token}`
        }
      })

      res.json(messagesResponse.data)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.response.data })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
