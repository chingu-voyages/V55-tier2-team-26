const app = require('./app.js')
const aiRouter = require('./routers/aichat.js')

app.use(aiRouter)

app.listen(process.env.PORT, ()=>{
    console.log('server is up on port ' + process.env.PORT)
})