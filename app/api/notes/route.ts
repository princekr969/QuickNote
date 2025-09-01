import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../utils/prisma';
import { verifyToken } from '../../utils/auth';
import { noteSchema } from '../../utils/validation';

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();

        const token = req.headers.get('authorization')?.split(' ')[1];

        if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { userId } = verifyToken(token)

        const { title, content } = noteSchema.parse(body);

        const note = await prisma.note.create({
            data: { title, content, userId }
        });
        
        return NextResponse.json(note);

    } catch (error) {

        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {

    try {
        
        const token = req.headers.get('authorization')?.split(' ')[1];

        if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { userId } = verifyToken(token);

        const notes = await prisma.note.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(notes);

    } catch (error) {

        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}