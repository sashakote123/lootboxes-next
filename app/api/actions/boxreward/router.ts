import { NextResponse } from 'next/server';


export async function GET() {
    try {

        return NextResponse.json({
            success: true,
            item: { openBox: true }

        });
    } catch (error) {
        return Response.json({ error: `Database error: ${error}` }, { status: 500 });
    }
}
