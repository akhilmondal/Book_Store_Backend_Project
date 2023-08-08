import WishList from '../models/wishlist.model';
import * as BookService from '../services/book.service';

// Add book to cart
export const addBookToWishList = async (_id, body) => {
  const book = await BookService.getBookById(_id); // 1 sarching book
  if (!book) {
    throw new Error('Book is not Available.');
  }
  let wishList = await WishList.findOne({ userId: body.user_id });
  // console.log(cart);

  if (!wishList) {
    wishList = await WishList.create({
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
      ]
    });
    return wishList;
  } else {
    const existingWishListItem = wishList.books.filter(
      (item) => item.bookId == _id
    );
    if (existingWishListItem.length > 0) {
      throw new Error('Book is already in the wishlist');
    } else {
      // If book is not in the cart then add it and update the cart
      wishList.books.push({
        bookId: book._id,
        bookName: book.bookName,
        description: book.description,
        bookImage: book.bookImage,
        author: book.author,
        quantity: 1,
        price: book.price
      });
      // After adding the book in the wishlist updating it in the database.
      const updatedWishList = await WishList.findOneAndUpdate(
        { userId: body.user_id },
        { books: wishList.books },
        {
          new: true
        }
      );
      return updatedWishList;
    }
  }
};
