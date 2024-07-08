import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from './routes/user.route.js';
import gigRoute from './routes/gig.route.js';
import reviewRoute from './routes/review.route.js';
import orderRoute from './routes/order.route.js';
import conversationRoute from './routes/conversation.route.js';
import messageRoute from './routes/message.route.js';
import authRoute from './routes/auth.route.js';
import FirstmessageRoute from './routes/Firstmessage.route.js';
import proposelRoute from './routes/proposel.route.js';
import confirmRoute from './routes/confirm.route.js';
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();
dotenv.config();
mongoose.set('strictQuery', true);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // Corrected variable name
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};
// const connect = async () => {

//     console.log(process.env.MONGO);

//     await mongoose.connect(process.env.MONGO);
//     console.log('database connected');
//   } catch (error) {
//     console.log(error);
//   }
// };
//middleware
//frontend port number
app.use(cors({origin:"http://localhost:3000",credentials:true}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth/', authRoute);
app.use('/api/users', userRoute);
app.use('/api/gigs', gigRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/orders', orderRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);
app.use('/api/proposel', proposelRoute);
app.use('/api/Firstmessage',FirstmessageRoute);
app.use('/api/confirm',confirmRoute);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong"

  return res.status(errorStatus).send(errorMessage);
})
//backend port number
app.listen(8000, () => {
  connect();
  console.log('localserver running');
});