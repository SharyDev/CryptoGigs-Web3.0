// File: models/firstmessage.model.js

import mongoose from 'mongoose';
const { Schema } = mongoose;

const firstmessageSchema = new Schema({
  buyerUsername: {
    type: String,
    required: true
  },
  buyerId: {
    type: String,
    required: true
  },
  sellername: {
    type: String,
    required: true
  },
  sellerId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: false,
  }
}, {
  timestamps: true
});

export default mongoose.model("Firstmessage", firstmessageSchema);
