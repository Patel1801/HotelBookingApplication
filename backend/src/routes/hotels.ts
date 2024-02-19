import express, {Request,Response} from 'express';
import Hotel from '../models/hotel';
import { check, validationResult } from "express-validator";
import verifyToken from '../middleware/auth';
import { cwd } from 'process';
import multer from 'multer';

const router = express.Router();

const imageStorage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, './uploads/images'); 
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname); 
    },
  });

  const uploads = multer({ storage: imageStorage });

router.post('/hotelregister', [
   check("name","Hotel Name is required").isString(),
   check("city","City is required").isString(),
   check("country","Country is required").isString(),
   check("description", "Description is required").isString(),
   check("price","Price is required").isString(),
   check("starrating","Star Rating is required").isString(),
   check("type","type is required").isString(),
   check("facilities","facilities is required").isString(),
   check("adult","adult is required").isString(),
   check("children","children is required").isString(),
   check("image").custom((value, { req }) => {
    if (!req.files || !req.files.length) {
        throw new Error('At least one image is required');
    }
    return true;
})
     
],uploads.array("image",5),verifyToken,async(req:Request , res:Response) =>{

    const errors = validationResult(req);
    

    if (!errors.isEmpty()) {
        console.log("Please Fill Up All the Field");
        return res.status(400).json({message:errors});
    }

    try {

        const userId = req.userId;
        let hotel =  await Hotel.findOne({userId});

        if(hotel){
            return res.status(400).json({message:"Hotel already exists."});
        }

     hotel = new Hotel({...req.body,
        userId: req.userId,
        image: req.files.map((file: any) => file.filename)
    });
     await hotel.save();

     return res.status(200).send({ message: "Hotel registered OK" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Something went wrong."})
    }
})

export default router;