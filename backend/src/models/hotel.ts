import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    price:{ type: Number, require:true },
    starrating:{type:Number, require:true},
    type:[{ type: String, required: true }],
    facilities:[{ type: String, required: true }],
    adult:{ type: Number, require:true },
    children:{ type: Number, require:true },
    image: { type: String, required: true }
    

  });

  const Hotel = mongoose.model("Hotel", hotelSchema);

  export default Hotel;