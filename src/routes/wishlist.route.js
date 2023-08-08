import express from 'express';
import * as WishListController from '../controllers/wishlist.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/:_id', userAuth, WishListController.addBookToWishList);

export default router;
