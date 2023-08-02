import Book from '../models/book.model';

// Get all Books
export const getAllBooks = async (body) => {
  const data = await Book.find({ admin_user_id: body.admin_user_id });
  return data;
};

//update Books
export const updateBook = async (_id, body) => {
  const data = await Book.findByIdAndUpdate(
    {
      _id: _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};