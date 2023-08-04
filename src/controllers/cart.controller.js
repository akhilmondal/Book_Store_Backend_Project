import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service';

export const addBookToCart = async (req, res, next) => {
  try {
    const data = await CartService.addBookToCart(req.params._id, req.body);
    if (data) {
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Cart created successfully'
      });
    } else {
      throw new Error('Cart not Created');
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

// controller to remove from cart.
export const removeBookFromCart = async (req, res, next) => {
  try {
    const data = await CartService.removeBookFromCart(req.params._id, req.body);
    if (data) {
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Cart updated successfully'
      });
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
