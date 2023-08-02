import HttpStatus from 'http-status-codes';
import * as BookService from '../services/book.service';

//Controller to get all Books
export const getAllBooks = async (req, res, next) => {
  try {
    const data = await BookService.getAllBooks(req.body);
    console.log(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All Books fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

//Controller to Update Book
export const updateBook = async (req, res, next) => {
  try {
    const data = await BookService.updateBook(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Book updated successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
