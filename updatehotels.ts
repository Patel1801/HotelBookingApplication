import express, { Request, Response } from 'express';
import Hotel from '../models/hotel';
import { check, validationResult } from 'express-validator';
import verifyToken from '../middleware/auth';
import multer from 'multer';

const router = express.Router();

// Configure Multer to handle file uploads
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/images');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});

const upload = multer({ storage: storage });


router.put('/hotel/:id', [
    check('name', 'Hotel Name is required').isString(),
    check('city', 'City is required').isString(),
    check('country', 'Country is required').isString(),
    check('description', 'Description is required').isString(),
    check('price', 'Price is required').isString(),
    check('starrating', 'Star Rating is required').isString(),
    check('type', 'Type is required').isString(),
    check('facilities', 'Facilities are required').isString(),
    check('adult', 'Number of adults is required').isNumeric(),
    check('children', 'Number of children is required').isNumeric(),
    check('image').custom((value, { req }) => {
        if (!req.files || req.files.length === 0) {
            throw new Error('At least one image is required');
        }
        return true;
    })
], upload.array('image', 5), verifyToken, async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log('Please fill in all the required fields');
        return res.status(400).json({ message: errors.array() });
    }

    const { id } = req.params;

    try {
        const userId = req.userId;
        let hotel = await Hotel.findById(id);

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        if (hotel.userId !== userId) {
            return res.status(403).json({ message: 'You are not authorized to update this hotel' });
        }

        // Update hotel details
        hotel.name = req.body.name;
        hotel.city = req.body.city;
        hotel.country = req.body.country;
        hotel.description = req.body.description;
        hotel.price = req.body.price;
        hotel.starrating = req.body.starrating;
        hotel.type = req.body.type;
        hotel.facilities = req.body.facilities;
        hotel.adult = req.body.adult;
        hotel.children = req.body.children;
        hotel.image = req.files.map((file: any) => file.filename);

        await hotel.save();

        return res.status(200).json({ message: 'Hotel updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

export default router;
