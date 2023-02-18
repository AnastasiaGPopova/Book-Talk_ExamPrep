const Book = require('../models/Book')
const User = require('../models/User')
const bookService = require('../services/bookService')
const bookUtility = require('../utils/bookUtility')
const parser = require('../utils/parser')



exports.getBookCreationPage = (req,res) => {
    res.render('create')
}

exports.postCreatedBook = async (req, res) => {
 const {title, author, genre, stars, imageUrl, bookReview} = req.body

    try{
        if(!title || !author || !stars || !imageUrl || !bookReview){
            throw new Error ("All fields are requiered!")
        }
        const newBook = await bookService.createNew({title, author, genre, stars, imageUrl, bookReview, owner: req.user._id})//encoded body-to, which we receive, will create a new cube
        //redirect
        res.redirect('/')

    } catch(error){
        const errors = parser.parseError(error)
        res.render('create', {errors})
    }

}

exports.getDetails = async (req, res) => {

    let currentBook = await bookService.getOne(req.params.bookId)//it makes a request to the DB and gives us back all accessories with all details and infos/not only the ID/
                                       .populate('whishingList') 
                                       .populate('owner')         
                                       .lean()

     if(!currentBook){
    return res.redirect('/404')
      }

let isLogged = false
// let rentedBy = currentHouse.rentedHome.map(x =>x.name)

// let isRented = true
// let isAvailable = true

// if(rentedBy.length == 0){
//     isRented = false
// }
//   if(pieces == 0){
//           isAvailable = false
// }

//       rentedBy = rentedBy.join(', ')

if(req.user){
    isLogged = true

    
    const isOwner = bookUtility.isBookOwner(req.user, currentBook)
    const isWishedAlready= await bookUtility.isWishedAlready(req.user._id, req.params.bookId)
    console.log(isOwner)
    console.log(isWishedAlready)

    res.render('details', {currentBook, isOwner, isLogged, isWishedAlready})
} else {
    res.render('details', {currentBook,isLogged})
}
}

exports.wish = async (req,res) =>{
    const currentBook = await bookService.getOne(req.params.bookId)
    const isOwner = bookUtility.isBookOwner(req.user, currentBook)

    if(isOwner){
        res.redirect('/')
    } else {
    currentBook.whishingList.push(req.user._id)
    await currentBook.save()
    res.redirect(`/${req.params.bookId}/details`)
    }

}


// exports.getEditPage = async (req,res) => {
//     const currentHouse = await housingService.getOneHouse(req.params.houseId).populate('owner').lean()
//     const isOwner = houseUtility.isHouseOwner(req.user, currentHouse)

//     if(!isOwner){
//         res.redirect('/')
//     } else {
//         res.render('edit', {currentHouse})
//     }
// }



// exports.postEditedHouse = async (req,res) => {
//     const {name, type, year, city, imageUrl, description, prices} = req.body
//     try{
//         if(!name || !type || !year || !city || !imageUrl || !description || !prices){
//             throw new Error ("All fields are requiered!")
//         }
//         const updatedHouse = await housingService.update(req.params.houseId,{name, type, year, city, imageUrl, description, prices} )//encoded body-to, which we receive, will create a new cube

//         res.redirect(`/${req.params.houseId}/details`)

//     } catch(error){
//         const errors = parser.parseError(error)
//         res.render(`edit`, {errors})
//     }
// }


// exports.getDeleteHouse= async (req, res) => {
//     const house = await housingService.getOneHouse(req.params.houseId).populate('owner').lean()
//     const isOwner = houseUtility.isHouseOwner(req.user, house)

//     if(!isOwner){
//         res.redirect('/')
//     } else {
//    const test = await housingService.deleteHouse(req.params.houseId)
//    res.redirect('/')
//     }
// }

// exports.getSearchPage = async (req,res) => {

//     let isSearched = false
//     res.render('search', {isSearched})
// }

// exports.getSearchPagewithResults = async (req, res) => {
//     let isSearched = true
//     const {searchedItem} = req.body

//     const allMatches = await housingService.getSearchedbyType(searchedItem).lean()
//     console.log(allMatches)


//     res.render('search', {allMatches, isSearched})
// }