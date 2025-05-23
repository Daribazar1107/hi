import { NextResponse } from "next/server";
import connectionToDatabase from "../../../lib/mongoose";
import Hotel from "../../../app/models/Hotel";

export async function GET(request) {
  try {
    await connectionToDatabase();

    // Get the search parameters from the URL
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const ubDetail = searchParams.get('ubDetail');

    // Build the search query
    let query = {};
    
    if (location) {
      if (location === 'Ulaanbaatar' && ubDetail) {
        // If searching in Ulaanbaatar with specific district
        query = {
          location: location,
          ubDetail: ubDetail
        };
      } else {
        // Search by location only
        query = { location: location };
      }
    }

    // Execute the search
    const hotels = await Hotel.find(query)
      .sort({ createdAt: -1 })
      .select('name location ubDetail stars rooms amenities images'); // Select only needed fields

    return NextResponse.json({
      success: true,
      count: hotels.length,
      data: hotels
    });

  } catch (error) {
    console.error("Error searching hotels:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to search hotels",
        details: error.message 
      },
      { status: 500 }
    );
  }
}
