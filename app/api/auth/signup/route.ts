import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../utils/prisma';
import bcrypt from 'bcryptjs';
import { sendOTP } from '../../../utils/email';

export async function POST(req: NextRequest) {
  try {
    const { email, password, dob } = await req.json();
    
    // Validate required fields
    if (!email || !password || !dob) {
      return NextResponse.json({ 
        error: 'Email, password, and date of birth are required' 
      }, { status: 400 });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }
    
    // Validate password strength (optional)
    if (password.length < 6) {
      return NextResponse.json({ 
        error: 'Password must be at least 6 characters long' 
      }, { status: 400 });
    }
    
    // Validate and parse date of birth
    const dateOfBirth = new Date(dob);
    if (isNaN(dateOfBirth.getTime())) {
      return NextResponse.json({ 
        error: 'Invalid date of birth format. Use YYYY-MM-DD' 
      }, { status: 400 });
    }
    
    const today = new Date();
    
    // Check if date of birth is not in the future
    if (dateOfBirth > today) {
      return NextResponse.json({ 
        error: 'Date of birth cannot be in the future' 
      }, { status: 400 });
    }
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user with date of birth
    const user = await prisma.user.create({
      data: { 
        email, 
        password: hashedPassword,
        dateOfBirth: dateOfBirth
      }
    });
    
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    // Delete any existing OTP for this email
    await prisma.oTP.deleteMany({
      where: { email }
    });
    
    // Save new OTP
    await prisma.oTP.create({
      data: { email, otp, expiresAt }
    });
    
    // Send OTP email
    await sendOTP(email, otp);
    
    return NextResponse.json({ 
      message: 'User created successfully.',
      userId: user.id,
      email: user.email
    });

  } catch (err) {
    console.error('Signup error:', err);
    
    if (typeof err === 'object' && err !== null && 'code' in err && (err as any).code === 'P2002') {
      return NextResponse.json({ 
        error: 'Email already exists' 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 

      error: 'Internal server error' 
    }, { status: 500 });
  }
}