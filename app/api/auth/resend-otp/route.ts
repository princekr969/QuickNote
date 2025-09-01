import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../utils/prisma';
import { sendOTP } from '../../../utils/email';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Validate required fields
    if (!email) {
      return NextResponse.json({ 
        error: 'Email is required' 
      }, { status: 400 });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }
    
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    
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
      message: 'OTP resent successfully.',
    });

  } catch (err) {
    console.error('Signup error:', err);
    
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}