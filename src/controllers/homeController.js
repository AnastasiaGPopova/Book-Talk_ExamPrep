//const Post = require('../models/Post.js')
const User = require('../models/User')
const Book = require('../models/Book')
const { all } = require('../routes')
const bookService = require('../services/bookService')


exports.getHomePage = async (req, res) => {
        res.render('home')
}


exports.getCatalogPage = async (req, res) => {
        const allBooks = await bookService.getAll().lean()
        res.render('catalog', {allBooks})
}

exports.getProfilePage = async (req,res) => {
    const currentUser = await User.findById(req.user._id).lean()
    const whishedBooks = await Book.find({whishingList: req.user._id}).lean()
    //const hotels = bookedHotels.map(h => h.name)

    res.render('auth/profile', {whishedBooks, currentUser})

}

// exports.getAboutPage = (req,res) => {
//     res.render('about')
// }

exports.getErrorPage404 = (req, res) => {
    res.render('404')
}