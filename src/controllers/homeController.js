//const Post = require('../models/Post.js')
const User = require('../models/User')
const { all } = require('../routes')
const bookService = require('../services/bookService')


exports.getHomePage = async (req, res) => {
        res.render('home')
}


exports.getCatalogPage = async (req, res) => {
        const allBooks = await bookService.getAll().lean()
        res.render('catalog', {allBooks})
}
// exports.getProfilePage = async (req,res) => {
//     const currentUser = await User.findById(req.user._id).lean()
//     const bookedHotels = await Hotel.find({bookedByUsers: req.user._id}).lean()
//     const hotels = bookedHotels.map(h => h.name)

//     res.render('auth/profile', { currentUser, hotels })

// }

// exports.getAboutPage = (req,res) => {
//     res.render('about')
// }

exports.getErrorPage404 = (req, res) => {
    res.render('404')
}