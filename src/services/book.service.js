import Book from '../models/book.model';

// Get all Books
export const getAllBooks = async () => {
  const data = await Book.find();
  return data;
};

//get books by book id
export const getBookById = async (_id) => {
  const data = await Book.findById(_id);
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
