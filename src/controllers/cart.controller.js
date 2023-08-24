import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service';

//get cart controller
export const getCart = async (req, res) => {
  try {
    const data = await CartService.getCart(req.body);
    if (data) {
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Cart fetched successfully'
      });
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const addBookToCart = async (req, res) => {
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
export const removeBookFromCart = async (req, res) => {
  try {
    const data = await CartService.removeBookFromCart(req.params._id, req.body);
    if (data) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
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

//Controller to purchase book
export const isPurchase = async (req, res) => {
  try {
    const data = await CartService.isPurchase(req.params._id, req.body);
    if (data) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Book purchased successfully'
      });
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
