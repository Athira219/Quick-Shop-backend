const wishlists = require('../Model/wishlistmodel')

//----------------ADD TO WISHLIST-------------------//

exports.wishlist = async (req, res) => {

    const { id, title, price, description, category, image, rating } = req.body
    const userId = req.payload
    console.log('wishlist userId=', userId);
    console.log('id=', id,title, price, description, category, image, rating);
    

    try {
        const existingAccount = await wishlists.findOne({ id, userId })
        if (existingAccount) {
            res.status(406).json('This Product  already in your Wishlist ')
        }
        else {
            const newProduct = new wishlists({
                id, title, price, description, category, image, rating, userId
            })
            await newProduct.save()
            res.status(200).json(newProduct)

        }

    } catch (err) {
        res.status(401).json(err)
    }

}
//-------------- WISHLIST ALL PRODUCTS----------------------//
exports.WishlistAllProducts = async (req, res) => {
    const userId = req.payload
    console.log(userId);
    try {
        const allProduct = await wishlists.find({ userId })
        res.status(200).json(allProduct)

    } catch (err) {
        res.status(401).json(err)
    }

}
//-------------------REMOVE WISHLIST ITEM--------------------//
exports.removeWishlistItem = async (req, res) => {
    const { id } = req.params
    console.log('remove id', id);

    try {
        const removeItem = await wishlists.findByIdAndDelete({ _id:id })
        res.status(200).json(removeItem)
    } catch (err) {
        res.status(401).json(err)
    }

}