import HttpStatus from 'http-status-codes';
import * as WishListService from '../services/wishlist.service'



export const addBookToWishList = async (req, res, next) => {
    try {
      const data = await WishListService.addBookToWishList(req.params._id, req.body);
      if (data) {
        res.status(HttpStatus.CREATED).json({
          code: HttpStatus.CREATED,
          data: data,
          message: 'WishList created successfully'
        });
      } else {
        throw new Error('WishList not Created');
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };