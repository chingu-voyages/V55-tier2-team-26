const app = require('./app.js')
const ai = require('./utils/chatbot-utils.js')

app.listen(process.env.PORT, ()=>{
    console.log('server is up on port ' + process.env.PORT)
    ai().then().catch((err)=>console.log(err))
})