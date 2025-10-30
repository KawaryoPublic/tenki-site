import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { files } = await request.json();

        if(!files || !Array.isArray(files) || files.length === 0) {
            return NextResponse.json({ error: "No files provided" }, { status: 400 });
        }

        const blobs = [];

        for (const file of files) {
            const blob = await put(file.name, file.data, {
                access: 'public',
            });
            blobs.push(blob);
        }
    
        return NextResponse.json({ blobs }, { status: 201 });
    } catch (error) {
        console.error("Error uploading a file:", error);
        return NextResponse.json({ error: "Failed to upload a file" }, { status: 500 });
    }
}