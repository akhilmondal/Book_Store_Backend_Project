import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

// Controller to create a new user
export const userRegistration = async (req, res) => {
  try {
    const data = await UserService.userRegistration(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

// Controller to login an user
export const userLogin = async (req, res) => {
  try {
    const userToken = await UserService.userLogin(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      userToken: userToken,
      message: 'User logged in successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
