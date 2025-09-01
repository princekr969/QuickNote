import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../utils/prisma';
import { verifyToken } from '../../../../utils/auth';


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {

        const noteId = params.id;
        const token = req.cookies.get('token')?.value;
       
        if (!token) {
            return NextResponse.json({ error: 'No authentication token' }, { status: 401 });
        }

        const { userId } = verifyToken(token);

        // Check if note exists and belongs to user
        const note = await prisma.note.findFirst({
            where: { id: noteId, userId }
        });

        if (!note) {
            return NextResponse.json({ error: 'Note not found' }, { status: 404 });
        }

        await prisma.note.delete({ where: { id: noteId } });
        return NextResponse.json({ message: 'Note deleted' });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}