import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: { type: String, required: true },
  stars: { type: Number, min: 1, max: 5, default: 3 },
  pricePerNight: { type: Number, required: true },
  amenities: [String],
  images: [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Hotel || mongoose.model("Hotel", HotelSchema);
