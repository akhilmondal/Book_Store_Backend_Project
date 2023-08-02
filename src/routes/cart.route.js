import express from 'express';
import * as CartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/:_id', userAuth, CartController.addBookToCart);

export default router;
