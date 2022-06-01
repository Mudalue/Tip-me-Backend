import express from 'express';
import useronboarding from '../controllers/user.js'
const router = express.Router();

const url = process.env.URL
//sign up 
router.post(`${url}/signup`, useronboarding())