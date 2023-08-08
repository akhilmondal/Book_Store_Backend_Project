import { Schema, model } from 'mongoose';

const cartSchema = new Schema(
  {
    userId: {
      type: String
    },
    books: [
      {
        bookId: {
          type: String
        },
        bookName: {
          type: String
        },
        description: {
          type: String
        },
        bookImage: {
          type: String
        },
        author: {
          type: String
        },
        quantity: {
          type: Number,
          default: 1
        },
        price: {
          type: Number
        }
      }
    ],
    cartTotal: {
      type: Number,
      default: 0
    },
    isPurchased: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default model('Cart', cartSchema);
