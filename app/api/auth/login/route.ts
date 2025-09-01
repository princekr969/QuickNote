import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../utils/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../utils/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (!user.isVerified) {
      return NextResponse.json({ error: 'Please verify your email first' }, { status: 401 });
    }
    
    // Generate JWT token
    const token = signToken({ userId: user.id });

    return NextResponse.json({ 
      token, 
      user: { id: user.id, email: user.email } 
    });

  } catch (error) {

    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}