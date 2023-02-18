const Book = require('../models/Book')

exports.getOne = (bookId) => Book.findById(bookId)
exports.getAll = () => Book.find()
exports.getLastAdded = () => Book.find({}).sort({createdAt: -1})
exports.update = (bookId, data) => Book.findByIdAndUpdate(bookId, data, {runValidators: true})
exports.delete = (bookId) => Book.findByIdAndDelete(bookId, {runValidators: true})
exports.getSearchedbyType = (item) => Book.find({}).where('type').equals(`${item}`)
exports.createNew = (data) => Book.create(data)
exports.getSearchedbyItem = (item) => {
    const regex = new RegExp(item, 'i') // i for case insensitive
    return Book.find({title: {$regex: regex}})
    }
