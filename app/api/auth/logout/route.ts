import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Create response
    const response = NextResponse.json({ 
      message: 'Logged out successfully' 
    });

    // Clear the token cookie
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/'
    });

    return response;

  } catch (error) {

    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
