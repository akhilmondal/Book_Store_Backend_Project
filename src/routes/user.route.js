import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


//Route to create a new user for Book Store
router.post('', newUserValidator, userController.userRegistration);


//Route to login a user to Book Store
router.post('/login', userController.userLogin);





export default router;
