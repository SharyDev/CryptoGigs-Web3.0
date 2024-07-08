import express from "express";
import {verifyToken} from '../middelware/jwt.js'
const router =express.Router();
import {createGig,getproposel,getlink,getupdate} from '../controller/proposel.controller.js'
router.post('/:id',verifyToken,createGig);
router.get('/:id',verifyToken, getproposel);
router.post('/',verifyToken, getlink);
router.get('/data/:id',verifyToken, getupdate);



export default router;