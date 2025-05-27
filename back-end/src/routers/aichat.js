const express = require('express')
const ai = require('../utils/chatbot-utils')

const router = new express.Router()

router.post('/chatbotai', async (req, res)=>{
    console.log(req.body)
})

module.exports = router