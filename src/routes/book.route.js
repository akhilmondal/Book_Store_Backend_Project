import express from 'express';
import * as bookController from '../controllers/book.controller';
import { userAuth, userRoleCheck } from '../middlewares/auth.middleware';

const router = express.Router();

//Router for Get All Books
router.get('',userAuth, bookController.getAllBooks);

//Router for Update Books
router.put('/:_id', userAuth, userRoleCheck, bookController.updateBook)

export default router;
