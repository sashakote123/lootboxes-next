import { db } from '@/lib/firebase';
import { ref, get } from "firebase/database";
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const snapshot = await get(ref(db, `lootboxes/${params.id}`));

    if (!snapshot.exists()) {
      return NextResponse.json(
        { error: 'Кейс не найден' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: params.id,
      ...snapshot.val()
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка сервера: ${error}` },
      { status: 500 }
    );
  }
}