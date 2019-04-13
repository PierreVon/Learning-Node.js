const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BookSchema = new Schema({
    title: {type: String, required: true},
    // author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
    //author: {type: String, required: true},
    summary: {type: String, required: true},
    isbn: {type: String, required: true}
})

BookSchema
    .virtual('url')
    .get(() => {
        return '/catalog/book/'
    })

module.exports = mongoose.model('Book', BookSchema)