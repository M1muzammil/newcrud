import express from 'express';
let router = express.Router()

import postRouter from './routes/profile.mjs'
router.use(postRouter)



export default router