import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  beds: { type: Number, required: true },
  bedType: {
    type: String,
    enum: [ 'King size', 'Queen size'],
    required: true
  }
});

const AmenitiesSchema = new mongoose.Schema({
  wifi: { type: Boolean, default: false },
  breakfast: { type: Boolean, default: false },
  parking: { type: Boolean, default: false },
  restaurant: { type: Boolean, default: false }
}, { _id: false });

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  ubDetail: { type: String },
  stars: { type: Number, min: 1, max: 5, default: 3 },
  email: { type: String, required: true },
  rooms: { type: [RoomSchema], default: [] },
  extraAddress: { type: String },
  amenities: { type: AmenitiesSchema, default: () => ({}) },
  images: { type: [String], default: [] }
}, { timestamps: true }); // Automatically adds createdAt, updatedAt

export default mongoose.models.Hotel || mongoose.model("Hotel", HotelSchema);
