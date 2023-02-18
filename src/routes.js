//--------Configuring the router /which gets exported at the end----------
const express = require('express')
const Router = express.Router
const router = Router()
// ----------------------------------


//----- importing the controllers----------
const bookController = require('./controllers/bookController')
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController.js')
const {isAuthenticated} = require('./middlewares/authMiddleware.js')

//-------------------------------------------


router.get('/', homeController.getHomePage)
router.get('/catalog', homeController.getCatalogPage)


//Login and Register

router.get('/login', authController.loginPage)
router.get('/register', authController.registerPage)
router.post('/register', authController.postRegisterUser)
router.post('/login', authController.postLoginUser)

//book creation
router.get('/create', isAuthenticated, bookController.getBookCreationPage )
router.post('/create', isAuthenticated, bookController.postCreatedBook)

//Details Page
router.get('/:bookId/details', bookController.getDetails)

//wish
router.get('/:bookId/wish', isAuthenticated, bookController.wish)
// // router.get('/post/:postId/voteDown', isAuthenticated, postController.voteDown)

// //Edit page
// router.get('/:houseId/edit', isAuthenticated, bookController.getEditPage)
// router.post('/:houseId/edit', isAuthenticated, bookController.postEditedHouse)

// // //Delete post
// router.get('/:houseId/delete', isAuthenticated, bookController.getDeleteHouse)

// // //search
// router.get('/search', isAuthenticated, bookController.getSearchPage)
// router.post('/search', isAuthenticated, bookController.getSearchPagewithResults)


router.get('/logout', isAuthenticated, authController.logout)
// router.get('*', homeController.getErrorPage404)
// router.get('/404', homeController.getErrorPage404)



module.exports = router