import dotenv from 'dotenv';
dotenv.config();
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//create new user
export const userRegistration = async (body) => {
  const userPresent = await User.findOne({ emailId: body.emailId });
  if (userPresent) {
    throw new Error('User is already Present. ');
  } else {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(body.passWord, salt);
    body.passWord = hash;
    const data = await User.create(body);
    return data;
  }
};

//User Login
export const userLogin = async (body) => {
  const data = await User.findOne({ emailId: body.emailId });
  if (data) {
    if (bcrypt.compareSync(body.passWord, data.passWord)) {
      var token = jwt.sign(
        { id: data.id, emailId: data.emailId, designation: data.designation },
        process.env.SECRET_TOKEN_KEY,
        { expiresIn: '10h' }
      );
      return token;
    } else {
      throw new Error('Invalid Password.');
    }
  } else {
    throw new Error('Invalid emailId.');
  }
};
