import express from 'express';
import * as WishListController from '../controllers/wishlist.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//Add book to the wishlist
router.post('/:_id', userAuth, WishListController.addBookToWishList);

//remove book from wishlist
router.put('/:_id', userAuth, WishListController.removeBookFromWishList);


export default router;
