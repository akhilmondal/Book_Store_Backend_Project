import express from 'express';
import * as CartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//Add book to the cart
router.post('/:_id', userAuth, CartController.addBookToCart);

//Remove book from the cart
router.put('/:_id', userAuth, CartController.removeBookFromCart);

//Router for purchase book
router.put('/purchase/:_id', userAuth, CartController.isPurchase);

export default router;
