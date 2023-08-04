import dotenv from 'dotenv';
dotenv.config();
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

let userDesignation;
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const user = await jwt.verify(bearerToken, process.env.SECRET_TOKEN_KEY);
    req.body.user_id = user.id;
    userDesignation = user.designation;
    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const userRoleCheck = async (req, res, next) => {
  try {
    if (userDesignation == 'admin') {
      next();
    } else {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Sorry! you are not authorised to Modify or Update Books.'
      };
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
