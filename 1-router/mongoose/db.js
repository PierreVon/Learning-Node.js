var mongoose = require('mongoose')
mongoose.connect('http://localhost:27017', {useNewUrlParser:true})
mongoose.Promise = global.Promise

const db = mongoose.connection

db.once('open', () => {
    console.log('Connected!')
})

db.on('error', () => {
    console.log('Connection failed!')
    mongoose.disconnect()
})

db.on('close', () => {
    console.log('Disconnect')
})

module.exports = db;