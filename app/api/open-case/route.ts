import { db } from '@/lib/firebase';
import { getRandomItem } from '@/methods/methods';
import { IItem } from '@/types/types';
import { ref, get, update } from "firebase/database";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { userId, caseId } = await request.json();
        const caseSnapshot = await get(ref(db, `lootboxes/${caseId}`));
        if (!caseSnapshot.exists()) {
            return NextResponse.json(
                { error: 'Case not found' },
                { status: 404 }
            );
        }
        const caseData = caseSnapshot.val();

        const userSnapshot = await get(ref(db, `users/${userId}`))
        const userData = userSnapshot.val();

        if (userData.coins < caseData.price) {
            return NextResponse.json(
                { error: 'Not Enought Balance!' },
                { status: 400 }
            );
        }
        const items = Object.values(caseData.items) as IItem[];

        const randomItem = getRandomItem(items);

        const newHistoryItem = {
            caseId,
            item: randomItem,
            timestamp: Date.now()
        };

        await update(ref(db, `users/${userId}`), {
            coins: userData.coins - caseData.price,
            inventory: [...(userData.inventory || []), randomItem],
            history: [...(userData.history || []), newHistoryItem]
        });


        return NextResponse.json({
            success: true,
            item: randomItem
        });



    } catch (error) {
        return Response.json({ error: `Database error: ${error}` }, { status: 500 });
    }
}



