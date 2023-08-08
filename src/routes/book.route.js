import express from 'express';
import * as bookController from '../controllers/book.controller';
import { userAuth, userRoleCheck } from '../middlewares/auth.middleware';

const router = express.Router();

//Router for Get All Books
router.get('', bookController.getAllBooks);

//router for get book by id
//router.get('/:_id', userAuth, bookController.getBookById);

//router to search book
router.get('/search', userAuth, bookController.searchBook);

//Router for Update Books
router.put('/:_id', userAuth, userRoleCheck, bookController.updateBook);

export default router;
