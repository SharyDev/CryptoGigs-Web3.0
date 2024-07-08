
import express from "express";
import {verifyToken} from '../middelware/jwt.js'
const router =express.Router();
import {createconfirm,getproposel,rejectform,getotherrecord} from '../controller/confirm.controller.js'
router.post('/:id',verifyToken,createconfirm);
router.get('/:id',verifyToken,getproposel);
router.get('/record/:id',verifyToken,getotherrecord);
router.get('/data/:id',verifyToken,rejectform);



export default router;