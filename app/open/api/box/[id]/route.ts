import { db } from '@/lib/firebase';
import { ref, get } from "firebase/database";
import { NextResponse } from 'next/server';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const boxId = String(params.id);
    
    const snapshot = await get(ref(db, `lootboxes/${boxId}`));

    if (!snapshot.exists()) {
      return NextResponse.json(
        { error: 'Кейс не найден' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: boxId,
      ...snapshot.val()
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Ошибка сервера: ${errorMessage}` },
      { status: 500 }
    );
  }
}