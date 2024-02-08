//  import express
const express = require('express')

const projectController = require('../Controller/projectsController')

const userController= require('../Controller/usersController')
const wishlistController = require('../Controller/wishlistController')
const cartController = require('../Controller/cartController')

const jwtMiddleWare = require('../middleWare/jwtMiddleware')
//create an object for router() class in the express module
const router = new express.Router()

//path
router.get('/ecomerce/projects',projectController.allProduct)
//register
router.post('/users/register',userController.register)
//login
router.post('/users/login',userController.login)
//getAProduct
router.get('/project/view/:id',projectController.getAProduct)
//add wishlist
router.post('/addWishlist',jwtMiddleWare,wishlistController.wishlist)
// Wishlist All Products
router.get('/wishlist/allproducts',jwtMiddleWare,wishlistController.WishlistAllProducts)
//remove wishlist item
router.delete('/wishlist/deleteWishlist/:id',jwtMiddleWare,wishlistController.removeWishlistItem)
//add to cart
router.post('/addCart',jwtMiddleWare,cartController.addToCart)
//cart all product
router.get('/carts/allProduct',jwtMiddleWare,cartController.cartAllProduct)
//remove cart item
router.delete('/carts/deleteCartItem/:id',jwtMiddleWare,cartController.removeItem)
//increment Item
router.get('/carts/incrementItem/:id',jwtMiddleWare,cartController.incrementItem)
//decrement Item
router.get('/carts/decrementItem/:id',jwtMiddleWare,cartController.decrementItem)
//empty cart
router.delete('/carts/emptyCart',jwtMiddleWare,cartController.emptyCart)



//export 
module.exports = router
