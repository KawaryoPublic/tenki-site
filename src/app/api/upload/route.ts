import { handleUpload, HandleUploadBody } from '@vercel/blob/client';
import { NextRequest, NextResponse } from 'next/server';
 
export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;
 
  try {
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('blob upload completed', blob, tokenPayload);
      },
    });
 
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error uploading blob:", error);
    return NextResponse.json({ error: "Failed to upload blob" }, { status: 500 });
  }
}