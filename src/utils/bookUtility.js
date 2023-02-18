const Book = require('../models/Book')
exports.isBookOwner = (user, book) => {
    let isOwner = false
    if(user){
        if(user._id == book.owner._id){
            isOwner = true
        }
    }
   return isOwner
}



exports.isWishedAlready = async (userId, bookId) => {
    let isWishedAlready = false
    const book = await Book.findById(bookId)
    //TO DO
    const wished = book.whishingList.find(x=> x == userId )

    if(wished){
        isWishedAlready = true
    }
    return isWishedAlready
}