import createError from '../utils/createError.js';
import Message from '../models/message.model.js';
import Firstmessage from '../models/firstmessage.model.js';
import Gig from '../models/gig.model.js';
import User from '../models/user.model.js'; 
import Conversation from '../models/message.model.js'
export const createMessage = async(req, res, next) => {
    const newMessage = new Message({
        conversationId: req.body.conversationId,
        userId: req.userId,
        desc: req.body.desc,
        Isread:false,
    });
    try {
        const savedMessage=await newMessage.save();
       
        res.status(201).send(savedMessage);
    } catch (err) {
        next(err)
    }
}
export const getMessages = async (req, res, next) => {
    const conversationId = req.params.id;
   

    try {
        const messages = await Message.find({
            conversationId: req.params.id
        });
        res.status(200).send(messages);
    } catch (err) {
        next(err)
    }
}


export const getMessagesupdate = async (req, res, next) => {
 
    try{
    const userId = req.userId; // Assuming 'req.userId' is set from a middleware after authentication
     // console.log(userId);
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).send({ message: "User not found" });
      }
  
      const query = { $or: [{ buyerId: userId }, { sellerId: userId }] };
      const messages = await Firstmessage.find(query).lean();
        const enhancedMessages = await Promise.all(messages.map(async message => {
      //  console.log(`Processing message: buyerId=${message.buyerId}, sellerId=${message.sellerId}`);

        const query12 = message.buyerId;
        const messages12 = await Message.find({ userId: query12 });
          
          // If the user is the buyer, we need the seller's username, and vice versa
          const otherUserId = message.buyerId === userId ? message.sellerId : message.buyerId;
          const otherUser = await User.findById(otherUserId);
      //    console.log(messages12.Isread);
        
    //  const messageDetails = await Message.findById( message.buyerId); // Assuming there's a link via 'firstMessageId'
  //    message.isread = messageDetails ? messageDetails.isread : true;
         if(messages12.Isread==false){
            message.notification="New Message";
            message.username = otherUser ? otherUser.username : 'Unknown User';  // Add username dynamically based on the context
            return message;

         }else{
            message.notification="No  New Message";
            message.username = otherUser ? otherUser.username : 'Unknown User';  // Add username dynamically based on the context
            return message;

         }
         
      }));

      res.status(200).send(enhancedMessages);
  } catch (err) {
      console.error("Error fetching messages:", err);
      next(err);
  }
};
