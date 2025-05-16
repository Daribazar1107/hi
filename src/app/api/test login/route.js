// import connectionToDatabase from "../../../lib/mongoose";
// import User from "../../../models/User";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

// export async function POST(request) {
//     try {
//         await connectionToDatabase();
        
//         const { email, password } = await request.json();

//         if (!email || !password) {
//             return NextResponse.json(
//                 { error: "Email and password are required" },
//                 { status: 400 }
//             );
//         }

//         if (password.length < 6) {
//             return NextResponse.json(
//                 { error: "Password must be at least 6 characters long" },
//                 { status: 400 }
//             );
//         }

//         // burtguuleegui eseh
//         const existingUser = await User.findOne({ email });
//         if (!existingUser) {
//             return NextResponse.json(
//                 { error: "Incorrect email" },
//                 { status: 400 }
//             );
//         }

//         const checkPassword = await bcrypt.compare(password, existingUser.password);
//         if (!checkPassword) {
//             return NextResponse.json(
//                 { error: "Incorrect password" },
//                 { status: 400 }
//             );
//         }

//         return NextResponse.json(
//             {
//               message: "succecsfully logged in",
//               user: {
//                 id: existingUser._id,
//                 email: existingUser.email,
//                 role: existingUser.role || "user",
//                 createdAt: existingUser.createdAt
//               },
//             },
//             { status: 200 }
//           );
        
//     } catch (error) {
//         console.error("succesfully failed:", error);
//         return NextResponse.json(
//             { error: "Internal Server Error" },
//             { status: 500 }
//         );
//     }
// }