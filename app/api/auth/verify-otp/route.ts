import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../utils/prisma';
import { signToken } from '../../../utils/auth';

export async function POST(req: NextRequest) {

  try {

    const { email, otp } = await req.json();

    const storedOtp = await prisma.oTP.findFirst({
      where: { email, otp, expiresAt: { gt: new Date() } }
    });

    if (!storedOtp) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }

    // Update user verification status
    await prisma.user.update({
      where: { email },
      data: { isVerified: true }
    });

    // Delete OTP record
    await prisma.oTP.delete({ where: { id: storedOtp.id } });

    // Get user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Generate JWT token
    const token = signToken({ userId: user.id });

    
    // Create response
    const response = NextResponse.json({ 
      user: { id: user.id, email: user.email },
      message: 'Verification successful'
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;

  } catch (error) {
    
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}