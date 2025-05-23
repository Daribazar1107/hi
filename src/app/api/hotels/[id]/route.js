import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/mongoose";
import Hotel from "../../../../app/models/Hotel";

export async function GET(request, { params }) {
  try {
    await connectionToDatabase();

    const hotel = await Hotel.findById(params.id);

    if (!hotel) {
      return NextResponse.json(
        { 
          success: false,
          error: "Hotel not found" 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: hotel
    });

  } catch (error) {
    console.error("Error fetching hotel:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to fetch hotel",
        details: error.message 
      },
      { status: 500 }
    );
  }
} 