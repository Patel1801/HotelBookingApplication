import express, { Request, Response } from 'express';
import Hotel from '../models/hotel';
import verifyToken from '../middleware/auth';

const router = express.Router();

// Endpoint for deleting a hotel
router.delete('/hotel/:id', verifyToken, async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const userId = req.userId;
        const hotel = await Hotel.findById(id);

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        if (hotel.userId !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this hotel' });
        }

        await Hotel.deleteOne({ _id: id });

        return res.status(200).json({ message: 'Hotel deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

export default router;
