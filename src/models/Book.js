const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [2, "Too short! Title should be at least 2 characters !"]
    }, 
    author: {
        type: String,
        required: true,
        minLength: [5, "Too short! Author should be at least 5 characters !"]
    }, 
    imageUrl: {
        type: String,
        required: true,
        // match: /^https?:\/\//
        validate : {
            validator: function (value){
                return value.startsWith("http://") || value.startsWith("https://")
            },
            message: "Invalid URL!"
        }
    }, 
    bookReview: {
        type: String,
        required: true,
        minLength: [10, "Too short! Book Review should be at least 10 characters !"]
    }, 
    genre: {
        type: String,
        required: true,
        minLength: [3, "Too short! Genre should be at least 3 characters !"]
    }, 
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5
        //maxLength: [15, "Too long! Location should be 15 characters !"]
    },
    whishingList:[{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    
    // createdAt: {
    //     type: Date, default: Date.now
    // },
}, { timestamps: true })

const Book = mongoose.model('Book', bookSchema)
module.exports = Book