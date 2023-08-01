import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    fullName: {
      type: String
    },
    emailId: {
      type: String
    },
    passWord: {
      type: String
    },
    phoneNumber: {
      type: String
    }

  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
