// import createError from '../utils/createError.js'
// import Firstmessage from '../models/firstmessage.model.js'
// import Gig from '../models/gig.model.js'

// export const createOrder = async (req, res, next) => {
  
  
//     try {
      
//       const gig = await Gig.findById(req.params.id);
//       console.log("--");
//       console.log(req.params.id);
//       if (!gig) {
//         return res.status(404).send({ message: "Gig not found" });
//       }
  
//    //   const ethTransactionId = req.body.ethTransactionId;  // Make sure this is being sent from the frontend

//       const newOrder = new Firstmessage({
//         buyerIdname:req.username,
//         buyerId: req.userId,  // Ensure this is being set correctly
//         sellerId: gig.userId,
      
//          // Store Ethereum transaction ID as payment intent
//       });
  
//       await newOrder.save();
//       res.status(201).send({
//         message: "Order created successfully",
//         Firstmessage: newOrder
//       });
  
//     } catch (error) {
//       console.error("Error creating order:", error);
//       res.status(500).send({ message: "Internal server error" });
//     }
//   }
// File: controllers/firstmessage.controller.js
import createError from '../utils/createError.js';
import Firstmessage from '../models/firstmessage.model.js';
import Message from '../models/message.model.js';
import Gig from '../models/gig.model.js';
import User from '../models/user.model.js';  // Typically, model names are capitalized

export const createOrder = async (req, res, next) => {
    const [gigId, userId] = req.params.gigId.split('-'); // Destructuring for clarity

    try {
        // Fetching gig and user details concurrently for efficiency
        const [gig, buyer] = await Promise.all([
            Gig.findById(gigId),
            User.findById(userId)
        ]);
         const va=gig.userId;
        const second = await User.findById(va);
        // Validating fetched data
        if (!gig) {
            return res.status(404).send({ message: "Gig not found" });
        }
       
        if (!buyer) {
            return res.status(404).send({ message: "User not found" });
        }
       
        const existingOrder = await Firstmessage.findOne({
            buyerId: buyer._id,
            sellerId: gig.userId
        });

        if (existingOrder) {
           
            // If an order already exists, do nothing or handle appropriately
            return res.status(409).send({ message: "Order already exists" });
        }
      
       
 
   //  

        // Creating a new order
        const newOrder = new Firstmessage({
            buyerUsername: buyer.username,
            buyerId: buyer._id, 
            sellername:second.username,// Assuming 'buyerId' is the same as the fetched 'userId'
            sellerId: gig.userId,  // Assuming 'userId' from the gig model refers to the seller
            email: buyer.email,
            // Add additional fields as necessary
        });

        await newOrder.save();
        res.status(201).send({
            message: "Order created successfully",
            orderDetails: newOrder
        });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(error.statusCode || 500).send({ message: error.message || "Internal server error" });
    }
};



  // Ensure the model is correctly imported

// export const getFirstMessagesByUserId = async (req, res, next) => {
  
//   try {
//     const userId = req.userId;  // Assuming 'req.userId' is set from a middleware after authentication
//     const query = { $or: [{ buyerId: userId }, { sellerId: userId }] }; // Fetches documents where the userId is either buyerId or sellerId
  
//     const messages = await Firstmessage.find(query);
//     res.status(200).send(messages);
//   } catch (err) {
//     console.error("Error fetching messages:", err);
//     next(err);  // Use Express's error handling middleware to handle errors
//   }
// };

// export const getFirstMessagesByUserId = async (req, res, next) => {
//   console.log("Received userId:", req.userId);
//   try {
//       const userId = req.userId; 
//       const query = { $or: [{ buyerId: userId }, { sellerId: userId }] };
//     //  console.log("Query:", query);

//       const messages = await Firstmessage.find(query).lean();
//     //  console.log("Found messages:", messages.length);

//       const enhancedMessages = await Promise.all(messages.map(async message => {
//           const otherUserId = message.buyerId === userId ? message.sellerId : message.buyerId;
//           const otherUser = await User.findById(otherUserId);
//           if(otherUser. _id!= req.userId ){
//             console.log("Other user data:", otherUser.username );
//             message.otherUsername = otherUser ? otherUser.username : 'Unknown User';
//           return message;
//           }else{
          
//             message.otherUsername =  'Unknown User';
//             return message;
//           }
        
          
//       }));

//      // console.log("Enhanced messages:", enhancedMessages[0].buyerUsername);
//       res.status(200).send(enhancedMessages);
//   } catch (err) {
//       console.error("Error fetching messages:", err);
//       next(err);
//   }
// };


export const getFirstMessagesByUserId = async (req, res, next) => {
  try {
   
      const userId = req.userId; // Assuming 'req.userId' is set from a middleware after authentication
    //  console.log(userId);
     // console.log(userId);
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).send({ message: "User not found" });
      }
  
      const query = { $or: [{ buyerId: userId }, { sellerId: userId }] };
      const messages = await Firstmessage.find(query).lean();
    //  const isread = await  Message.findById();
       // Default to true if no details found
    //    const conversationId =userId+ userId
    //    const messages24 = await Message.find({
    //     buyerId: buyerId,
    //     conversationId: conversationId
    // });

      // Determine the role of the user for dynamic username fetching
      const enhancedMessages = await Promise.all(messages.map(async message => {
      //  console.log(`Processing message: buyerId=${message.buyerId}, sellerId=${message.sellerId}`);

        const query12 = message.buyerId;
        const messages12 = await Message.find({ userId: query12 });
          
          // If the user is the buyer, we need the seller's username, and vice versa
          const otherUserId = message.buyerId === userId ? message.sellerId : message.buyerId;
          const otherUser = await User.findById(otherUserId);
        
        
    //  const messageDetails = await Message.findById( message.buyerId); // Assuming there's a link via 'firstMessageId'
  //    message.isread = messageDetails ? messageDetails.isread : true;
 // console.log(otherUser);
         if(messages12.Isread==false){
            message.notification="New Message";
            message.username = otherUser ? otherUser.username : 'Unknown User';  // Add username dynamically based on the context
            return message;

         }else{
            message.email=otherUser ? otherUser.email : 'Unknown email';;
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