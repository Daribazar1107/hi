import { NextResponse } from "next/server";
import User from "../../../../models/User";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(request) {
    try {
        const { email } = await request.json();
        console.log('Received email:', email);
        
        const user = await User.findOne({ email });
        console.log('User found:', user);
        if (!user) {
            return NextResponse.json(
                { Status: 'Error', message: 'Хэрэглэгч олдсонгүй.' },
                { status: 404 }
            );
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        console.log('Reset token:', resetToken);
        user.resetToken = resetToken;
        user.resetTokenExpires = Date.now() + 600000; // 10 min
        await user.save();

        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: '1234567' 
        }   
    
        });

        var mailOptions = {
            from: '',
            to: '',
            subject: 'Reset Password Link',
            text: `http://localhost:5173/reset_password/${user._id}/${token}`
          };


         await transporter.sendMail({
      to: user.email,
      subject: "Нууц үг сэргээх",
      html: `
        <p>Нууц үгээ сэргээхийн тулд дараах холбоос дээр дарна уу:</p>
        <a href="${resetURL}">Нууц үг сэргээх</a>
        <p>Энэхүү холбоос 1 минутын хугацаанд хүчинтэй байна.</p>
      `,
    });

    return NextResponse.json(
      { Status: "Success", message: "И-мэйл илгээгдлээ." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json(
      { Status: "Error", message: "Дотоод алдаа." },
      { status: 500 }
    );
  }
}
