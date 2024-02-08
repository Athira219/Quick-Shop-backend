
const carts = require('../Model/cartModel');
const { findOne, deleteOne } = require('../Model/projectSchema');
const { allProduct } = require('./projectsController');

//-----------ADD TO CART--------------//
exports.addToCart = async (req, res) => {
    const userId = req.payload
    console.log('cart userId=', userId);

    const { id, title, price, description, category, image, rating, quantity } = req.body
    console.log(id, title, price, description, category, image, rating, quantity);

    try {
        const existingProduct = await carts.findOne({ id, userId })
        if (existingProduct) {

            existingProduct.quantity += 1
            existingProduct.grandTotal = existingProduct.quantity * existingProduct.price
            await existingProduct.save()
            res.status(200).json('Added to Cart')

        } else {
            const newProduct = new carts({ id, title, price, description, category, image, rating, quantity, 
                grandTotal: price, userId })
            await newProduct.save()
            res.status(200).json(newProduct)


        }
    }
    catch (err) {
        res.status(401).json(err)
    }


}
//--------- all product--------------------//
exports.cartAllProduct = async (req, res) => {

    const userId = req.payload
    console.log('cart get userId =', userId);

    try {
        const allProduct = await carts.find({ userId })
        res.status(200).json(allProduct)

    }
    catch (err) {
        res.status(401).json(err)
    }
}
//-------------REMOVE ITEM------------------//
exports.removeItem = async (req, res) => {
    const { id } = req.params
    console.log(id);
    try {
        const cartItem = await carts.deleteOne({ _id: id })
        res.status(200).json(cartItem)

    } catch (error) {
        res.status(401).json(error)
    }

}
//-------------increment Item-------------//
exports.incrementItem = async (req, res) => {
    const { id } = req.params
    console.log(id);
    try {
        const selectedItems = await carts.findOne({ _id: id })
        if (selectedItems) {
            selectedItems.quantity += 1
            selectedItems.grandTotal = selectedItems.price * selectedItems.quantity
            await selectedItems.save()
            res.status(200).json(selectedItems)
        } else {
            res.status(406).json('No such product')
        }

    }
    catch (err) {
        res.status(401).json(err)
    }

}
//-------------decrement Item-------------//
exports.decrementItem = async (req, res) => {
    const { id } = req.params
    try {
        const selectedItem = await carts.findOne({ _id: id })

        if (selectedItem) {
            selectedItem.quantity -= 1

            if (selectedItem.quantity == 0) {
                await carts.deleteOne({ _id: id })
                res.status(200).json('Item removed from cart')

            } else {
                selectedItem.grandTotal = selectedItem.price * selectedItem.quantity
                selectedItem.save()
                res.status(200).json(selectedItem)
            }

        } else {
            res.status(406).json('no item found')
        }

    } catch (err) {
        res.status(401).json(err)
    }

}
//-------------empty Cart-------------//
exports.emptyCart = async (req, res) => {
    const userId = req.payload
    try {
        await carts.deleteMany({ userId })
        res.status(200).json('cart deleted successfully')

    } catch (err) {
        res.status(401).json(err)
    }

}