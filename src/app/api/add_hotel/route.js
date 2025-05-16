import { NextResponse } from "next/server";
import connectionToDatabase from "../../../lib/mongoose";
import Hotel from "../../../models/Hotel";

export async function POST(request) {
  try {
    await connectionToDatabase();

    const data = await request.json();
    const { name, description, location, stars, pricePerNight, amenities, images } = data;

    if (!name || !location || !pricePerNight) {
      return NextResponse.json(
        { error: "Name, location, and pricePerNight are required" },
        { status: 400 }
      );
    }

    const newHotel = new Hotel({
      name,
      location,
      stars,
      pricePerNight,
      amenities,
      description,
      images,
    });

    await newHotel.save();
4
    return NextResponse.json(
      { message: "Hotel created successfully", hotel: newHotel },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating hotel:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
