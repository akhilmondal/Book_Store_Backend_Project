import Book from '../models/book.model';

// Get all Books
export const getAllBooks = async (body) => {
  const data = await Book.find({ admin_user_id: body.admin_user_id });
  return data;
};
