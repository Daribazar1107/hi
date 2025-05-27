import { NextResponse } from "next/server";
import connectionToDatabase from "../../../lib/mongoose";
import Hotel from "../../models/Hotel";

export async function POST(request) {
  try {
    await connectionToDatabase();

    const data = await request.json();
    const {
      name,
      location,
      ubDetail,
      stars,
      email,
      rooms,
      extraAddress,
      amenities,
      images
    } = data;

    // Basic validation
    if (!name || !location || !email) {
      return NextResponse.json(
        { error: "Name, location, and email are required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(rooms) || rooms.length === 0) {
      return NextResponse.json(
        { error: "At least one room is required" },
        { status: 400 }
      );
    }

    const newHotel = new Hotel({
      name,
      location,
      ubDetail: ubDetail || '',
      stars: stars || 3,
      email,
      rooms,
      extraAddress: extraAddress || '',
      amenities: amenities || {},
      images: images || []
    });

    await newHotel.save();

    return NextResponse.json(
      {
        message: "Hotel added successfully",
        hotel: newHotel
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error adding hotel:", error);
    return NextResponse.json(
      { error: "Failed to add hotel" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectionToDatabase();

    const hotels = await Hotel.find().sort({ createdAt: -1 });

    return NextResponse.json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return NextResponse.json(
      { error: "Failed to fetch hotels" },
      { status: 500 }
    );
  }
}
