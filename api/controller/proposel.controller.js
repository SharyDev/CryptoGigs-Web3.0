// import Firstmessage from '../models/firstmessage.model.js';
// import Message from '../models/message.model.js';
// import Gig from '../models/gig.model.js';
// import User from '../models/user.model.js';  // Typically, model names are capitalized

// export const createOrder = async (req, res, next) => {
//     const [gigId, userId] = req.params.gigId.split('-'); // Destructuring for clarity

//     try {
//         // Fetching gig and user details concurrently for efficiency
//         const [gig, buyer] = await Promise.all([
//             Gig.findById(gigId),
//             User.findById(userId)
//         ]);
//          const va=gig.userId;
//         const second = await User.findById(va);
//         // Validating fetched data
//         if (!gig) {
//             return res.status(404).send({ message: "Gig not found" });
//         }
       
//         if (!buyer) {
//             return res.status(404).send({ message: "User not found" });
//         }
       
//         const existingOrder = await Firstmessage.findOne({
//             buyerId: buyer._id,
//             sellerId: gig.userId
//         });

//         if (existingOrder) {
           
//             // If an order already exists, do nothing or handle appropriately
//             return res.status(409).send({ message: "Order already exists" });
//         }
//         console.log("its not  runnig");
       
 
//    //  

//         // Creating a new order
//         const newOrder = new Firstmessage({
//             buyerUsername: buyer.username,
//             buyerId: buyer._id, 
//             sellername:second.username,// Assuming 'buyerId' is the same as the fetched 'userId'
//             sellerId: gig.userId,  // Assuming 'userId' from the gig model refers to the seller
            
//             // Add additional fields as necessary
//         });

//         await newOrder.save();
//         res.status(201).send({
//             message: "Order created successfully",
//             orderDetails: newOrder
//         });

//     } catch (error) {
//         console.error("Error creating order:", error);
//         res.status(error.statusCode || 500).send({ message: error.message || "Internal server error" });
//     }
// };

import Proposel from '../models/proposel.model.js';
import createError from '../utils/createError.js';
import User from '../models/user.model.js';
import Upload from '../models/upload.model.js';
import Confirm from '../models/confirm.model.js';

export const createGig = async (req, res, next) => {

  const id = req.params.id;
   const parts = id.split('-');  // Using '-' as the delimiter to split the string

    

    if (req.isSeller === false) { return next(createError(403, 'Only Seller Create a Propsel')); }
    const gig = await User.findById(parts[0]);
    const gig1 = await User.findById(parts[1]);
   
    const newGig = new Proposel({
      SellerId: gig._id,
      Sellername: gig.username,
      Selleradress:gig.wallet_address,
      buyerId: gig1. _id,
      buyername: gig1.username,
      ...req.body
    })
    

    try {
      const savedGig = await newGig.save();
      res.status(201).json(savedGig);
    } catch (error) {
      next(error);
    }
  };

  export const getproposel = async (req, res, next) => {
      const buyerId = req.params.id;  // Get the buyer ID from request parameters
   // Logging the buyer ID for debugging purposes
      
  
      try {
          const proposels = await Proposel.find({ buyerId: buyerId });  // Using .find() with a query object to match the buyerId
          console.log(proposels.length);
          
          
            res.status(200).send(proposels);


          
          
         
          // If proposals are found, send them back with a 200 status
         
      } catch (err) {
          // If an error occurs, pass it to the error handling middleware
          next(err);
      }
  };
  
  export const getlink = async (req, res, next) => {
    const _link  = req.body.userlink;
    const link12  = req.body.id;
    const proposels = await Confirm.findById(link12);  
          
        
        const result = await Confirm.updateOne({ _id:link12 }, { $set: { "status": "submitted" } });
        const result1 = await Confirm.updateOne({ _id:link12 }, { $set: { "link": _link } });
      //  console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
      //  console.log(result);
        console.log(proposels);
          // const newupload = new Upload({
          //   link:link
          // })
          
      
          try {
            // const savedGig = await newupload.save();
            // res.status(201).json(savedGig);
          } catch (error) {
            next(error);
          }
  };
  export const getupdate = async (req, res, next) => {

    
    // const _link  = req.body.userlink;
    // const link12  = req.body.id;
      const proposels = await Confirm.findById( req.params.id);  
          
        
        
          let intValue = parseInt(proposels.numberofrevion, 10);
          if (intValue <= 0) {
            console.log("The value is less than or equal to zero.");
            alert("You already get all revions");
        } else{

          let _numberofrevion=intValue-1;
         
          let stringValue = _numberofrevion.toString();
       
          const result = await Confirm.updateOne({ _id: req.params.id }, { $set: { "numberofrevion": stringValue} });
        
          const result1 = await Confirm.updateOne({ _id: req.params.id }, { $set: { "status": "progress" } });
        }
    //     const result1 = await Confirm.updateOne({ _id:link12 }, { $set: { "link": _link } });
    //   //  console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    //   //  console.log(result);
    //     console.log(proposels);
    //       // const newupload = new Upload({
    //       //   link:link
    //       // })
          
      
          try {
            // const savedGig = await newupload.save();
            res.status(201).send("");
          } catch (error) {
            next(error);
          }
  };
