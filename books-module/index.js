'use strict';
const consts = require ('./../data/consts'),
      books = require('./../data/payments'),
      Promise = require('promise'),
      mongoose = require('mongoose');

mongoose.connect(consts.MLAB_KEY);
const conn = mongoose.connection; 

class Book {
    constructor() {
        conn.on('error',
            (err) => {
                console.log(`connection error: ${err}`);
            });
        conn.on('open', function() {
            console.log("Connection established");
        });  
        conn.on('disconnected', function() {
            console.log(' Connection stopped, reconnect');
            mongoose.connect(consts.MLAB_KEY);
        });
        conn.on('reconnected', function() {
            console.log('mongoose reconnected');
        })  
    }

    getAllBooks() {
        return new Promise((resolve, reject) => {
            books.find({}, (err, result) => {

                if (err) reject (err);
                else resolve(result);
            });
        })
    }
 
    getBookById(_id) {
        return new Promise((resolve, reject) => {
            books.find({id: _id}, (err, result) => {
                if (err) reject (err);
                else resolve(result);
            });
        })
    }

    getBooksByPrice(minPrice, maxPrice) {
        return new Promise((resolve, reject) => {
            books.find({price: { $gte: minPrice, $lte: maxPrice }}, (err, result) => {
                if (err) reject (err);
                else resolve(result);
            });
        })
    }
}

module.exports = () => {
    var book = new Book();
    return book;
}