import Cart from '../models/cart.model';
import * as BookService from '../services/book.service';

// Add book to cart
export const addBookToCart = async (_id, body) => {
  const book = await BookService.getBookById(_id);
  if (!book) {
    throw new Error('Book is not Available.');
  }
  let cart = await Cart.findOne({ userId: body.admin_user_id });
  if (!cart) {
    cart = await Cart.create({
      userId: body.admin_user_id,
      books: [
        {
          bookId: book._id,
          bookName: book.bookName,
          description: book.description,
          bookImage: book.bookImage,
          author: book.author,
          quantity: book.quantity,
          price: book.price
        }
      ],
      cartTotal: book.price
    });
    return cart;
  }
};
