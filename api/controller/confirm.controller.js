import Confirm from '../models/confirm.model.js';
import createError from '../utils/createError.js';
import User from '../models/user.model.js';
import Proposel from '../models/proposel.model.js';



export const createconfirm = async (req, res, next) => {

  const id = req.params.id;
  const parts = id.split('-');  // Using '-' as the delimiter to split the string
 
  if (parts.length !== 3) {
    return next(createError(400, 'Invalid id format'));
  }

  try {
    const sellerId = parts[0];
    const buyerId = parts[1];
    const data=parts[2];

    
    const seller = await User.findById(sellerId);
    const buyer = await User.findById(buyerId);
  
    if (!seller || !buyer) {
      return next(createError(404, 'User not found'));
    }

    const proposel = await Proposel.findOne({ sellerId, buyerId });
  
    if (!proposel) {
      return next(createError(404, 'Proposel not found'));
    }
     
   // callcontract(seller._id,proposel.desc,proposel.price,proposel.createdAt,proposel.deliveryTime,0.05);
    const newConfirm = new Confirm({
      SellerId: seller._id,
      Sellername: seller.username,
      buyerId: buyer._id,
      buyername:buyer.username,
      numberofrevion:proposel.rivisonNumbers,
      status:"progress",
      contract:data,
      link:"Not available",
    });
    const proposals = await Proposel.findOneAndDelete({ sellerId, buyerId });
    console.log(proposals);
    console.log("proposals");
    const savedConfirm = await newConfirm.save();
    res.status(201).json(savedConfirm);
  } catch (error) {
    console.log(error); // Log any errors that occur during the save operation
    next(error);
  }
};



export const rejectform = async (req, res, next) => {

  const id = req.params.id;
  const parts = id.split('-');  // Using '-' as the delimiter to split the string

  if (parts.length !== 2) {
    return next(createError(400, 'Invalid id format'));
  }

  try {
    const sellerId = parts[0];
    const buyerId = parts[1];
   
  
  

    const proposel = await Proposel.findOne({ sellerId, buyerId });
  
    if (!proposel) {
      return next(createError(404, 'Proposel not found'));
    }
     
   // callcontract(seller._id,proposel.desc,proposel.price,proposel.createdAt,proposel.deliveryTime,0.05);
   
    const proposals = await Proposel.findOneAndDelete({ sellerId, buyerId });
    console.log(proposals);
    console.log("proposals");
  
    res.status(201).send();
  } catch (error) {
    console.log(error); // Log any errors that occur during the save operation
    next(error);
  }
};

export const getproposel = async (req, res, next) => {
 
  const buyerId = req.params.id;  // Get the buyer ID from request parameters


  try {
    const proposals = await Confirm.find({ $or: [{ buyerId: buyerId }, { SellerId: buyerId }] });
   
      // if (proposals.length === 0) {
      //     // If no proposals are found, send a 404 error
      //     return next(createError(404, 'No proposals found for this buyer'));
      // }
      // If proposals are found, send them back with a 200 status
    
      res.status(200).send(proposals);
  } catch (err) {
      // If an error occurs, pass it to the error handling middleware
      next(err);
  }
};

export const updateproposel = async (req, res, next) => {
 
  const buyerId = req.params.id;  // Get the buyer ID from request parameters
 // Logging the buyer ID for debugging purposes
 

  try {
    const proposals = await Confirm.find({ $or: [{ buyerId: buyerId }, { SellerId: buyerId }] });
   
    // Using .find() with a query object to match the buyerId
    //console.log(req.params.id); 
      if (proposals.length === 0) {
          // If no proposals are found, send a 404 error
          return next(createError(404, 'No proposals found for this buyer'));
      }
      // If proposals are found, send them back with a 200 status
    
      res.status(200).send(proposals);
  } catch (err) {
      // If an error occurs, pass it to the error handling middleware
      next(err);
  }
};



export const getotherrecord = async (req, res, next) => {

  
 
  const buyerId = req.params.id;  // Get the buyer ID from request parameters
   

  try {
     const proposals = await Confirm.find({ buyerId: buyerId } );
   
      if (proposals.length === 0) {
       // console.log("hoooooooooooooooooooooooooo---");
         // return next(createError(404, 'No proposals found for this buyer'));
      }
      else{
         
        console.log(buyerId);
        res.status(200).send(proposals);
      }
      // If proposals are found, send them back with a 200 status
    
      
  } catch (err) {
      // If an error occurs, pass it to the error handling middleware
      next(err);
  }
};
