import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../utils/prisma';
import { verifyToken } from '../../../utils/auth';

export async function GET(req: NextRequest) {

    try {
        const token = req.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'No authentication token' }, { status: 401 });
        }

        const { userId } = verifyToken(token);

        // Fetch notes from database
        const notes = await prisma.note.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: 'desc', 
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return NextResponse.json(notes);

    } catch (error) {

        console.error('Error fetching notes:', error);
        return NextResponse.json(
            { error: 'Failed to fetch notes' },
            { status: 500 }
        );
    }
}
