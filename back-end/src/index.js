const app = require('./app.js')

app.listen(process.env.PORT, ()=>{
    console.log('server is up on port ' + process.env.PORT)
})