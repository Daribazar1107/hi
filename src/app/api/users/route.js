import connectionToDatabase from "../../../lib/mongoose";
import User from "../../../models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectionToDatabase();
        
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: "Password must be at least 6 characters long" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 400 }
            );
        }

        // Create new user
        const newUser = new User({ email, password });
        await newUser.save();

        return NextResponse.json(
            { 
                message: "User created successfully",
                user: {
                    email: newUser.email,
                    role: newUser.role,
                    createdAt: newUser.createdAt
                }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error in POST request:", error);
        
        // Handle specific error types
        if (error.name === 'ValidationError') {
            return NextResponse.json(
                { error: "Invalid input data" },
                { status: 400 }
            );
        }
        
        if (error.code === 11000) {
            return NextResponse.json(
                { error: "Email already exists" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    return NextResponse.json(
        { message: "GET request to /api/users" },
        { status: 200 }
    );
}