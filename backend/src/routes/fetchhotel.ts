import express, { Request, Response } from 'express';
import Hotel from '../models/hotel';
import verifyToken from '../middleware/auth';

const router = express.Router();


router.get('/hotel/:id', verifyToken, async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const hotel = await Hotel.findById(id);

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        return res.status(200).json(hotel);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

export default router;
