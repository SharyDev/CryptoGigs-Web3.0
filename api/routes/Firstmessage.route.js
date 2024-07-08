import express from "express";
import {verifyToken} from '../middelware/jwt.js'
const router =express.Router();
import {createOrder,getFirstMessagesByUserId} from '../controller/Firstmessage.controller.js'
router.post('/:gigId',verifyToken,createOrder);
router.get('/',verifyToken, getFirstMessagesByUserId);


export default router;




