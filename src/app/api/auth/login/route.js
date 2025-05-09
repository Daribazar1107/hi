import connectionToDatabase from "../../../../lib/mongoose";
import User from "../../../../models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        await connectionToDatabase();
        
        const { email, password } = await request.json();

        // Input validation
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 401 }
            );
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 402 }
            );
        }

        // Verify password
        //const isValidPassword = await bcrypt.compare(password, user.password);
        if (password != user.password) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 403 }
            );
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user._id,
                email: user.email,
                role: user.role 
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        return NextResponse.json({
            token,
            user: {
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 