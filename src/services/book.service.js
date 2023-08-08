import Book from '../models/book.model';

// Get all Books
export const getAllBooks = async (req) => {
  let { page } = req.query;
  let size = 5; //default size
  const pageNumber = parseInt(page);
  const booksNumber = parseInt(size);
  const skip = (pageNumber - 1) * size;
  const data = await Book.find().limit(booksNumber).skip(skip);
  return data;
};

//get books by book id
export const getBookById = async (_id) => {
  const data = await Book.findById(_id);
  return data;
};

//search books
export const searchBook = async (req) => {
  let { key } = req.query;
  if (isNaN(key)) {   // checking the key is a number or not
    const searchRegex = new RegExp(key, 'i'); //To ignore Case
    //console.log(searchRegex); //-----> /billy/i

    let searchedBook = await Book.find({
      $or: [
        { bookName: searchRegex },
        { description: searchRegex },
        { author: searchRegex }
      ]
    });
    return searchedBook;
  } else {
    let searchedBook = await Book.find({ price: key });
    console.log(searchedBook);
    if (searchedBook[0] != null) {
      return searchedBook;
    } else {
      throw new Error('No result found');
    }
  }
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
