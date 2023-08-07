import Cart from '../models/cart.model';
import * as BookService from '../services/book.service';

// Add book to cart
export const addBookToCart = async (_id, body) => {
  const book = await BookService.getBookById(_id); // 1 sarching book
  if (!book) {
    throw new Error('Book is not Available.');
  }
  let cart = await Cart.findOne({ userId: body.user_id });
  // console.log(cart);

  if (!cart) {
    cart = await Cart.create({
      userId: body.user_id,
      books: [
        {
          bookId: book._id,
          bookName: book.bookName,
          description: book.description,
          bookImage: book.bookImage,
          author: book.author,
          quantity: 1,
          price: book.price
        }
      ],
      cartTotal: book.price
    });
    return cart;
  } else {
    let total;
    const existingCartItem = cart.books.filter((item) => item.bookId == _id);
    if (existingCartItem.length > 0) {
      const bookItem = cart.books.map((item) => {
        if (item.bookId == _id) {
          item.quantity += 1; //book quantity
          total = cart.cartTotal + item.price; //cart total
        }
        return item;
      });
      await Cart.updateOne(
        { userId: body.user_id },
        { books: bookItem, cartTotal: total },
        {
          new: true
        }
      );
      return cart;
    } else {
      // If book is not in the cart then add it and update the cart
      cart.books.push({
        bookId: book._id,
        bookName: book.bookName,
        description: book.description,
        bookImage: book.bookImage,
        author: book.author,
        quantity: 1,
        price: book.price
      });
      total = cart.cartTotal + book.price; //updating the total price of the cart.

      // After adding the book in the cart updating it in the server.
      const updatedCart = await Cart.findOneAndUpdate(
        { userId: body.user_id },
        { books: cart.books, cartTotal: total },
        {
          new: true
        }
      );
      return updatedCart;
    }
  }
};

// Remove book from cart

export const removeBookFromCart = async (_id, body) => {
  const cart = await Cart.findOne({ userId: body.user_id });
  if (cart) {
    let total;
    cart.books.map((item) => {
      if (item.bookId == _id) {
        if (item.quantity != 1) {
          total = cart.cartTotal - item.price; //cart total
          item.quantity -= 1; //book quantity
          return item;
        } else {
          cart.books.pop(item);
          return item;
        }
      }
    });
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: body.user_id },
      { books: cart.books, cartTotal: total },
      {
        new: true
      }
    );
    return updatedCart;
  }
};
