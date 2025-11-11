import { getTier } from '@/lib/action';
import { checkTier } from '@/lib/util';
import { handleUpload, HandleUploadBody } from '@vercel/blob/client';
import { NextRequest, NextResponse } from 'next/server';
 
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const tier = await getTier(request);
    
    if(!checkTier(tier)) {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }   

    const body = (await request.json()) as HandleUploadBody;

    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('Blob upload completed', blob, tokenPayload);
      },
    });
 
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error uploading blob:", error);
    return NextResponse.json({ error: "Failed to upload blob" }, { status: 500 });
  }
}