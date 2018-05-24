
var mongoose = require('mongoose'),
    schema = mongoose.Schema,

    BooksSchema = new schema({
        id: {type:Number, index:1, required:true, unique:true},
        name: String,
        type: {type:String, required:true},
        price: Number,
        discount: Number
    }, {collection: 'Books'});

var Books = mongoose.model('Books', BooksSchema);

module.exports = Books;