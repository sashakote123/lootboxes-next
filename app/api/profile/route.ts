import { db } from '@/lib/firebase';
import { ref, get, update } from "firebase/database";
import { NextResponse } from 'next/server';

// interface IUser {
//     id: number
// }

export async function POST(request: Request) {
    try {
        const { userData } = await request.json();
        const userRef = ref(db, `users/user${userData.id}`);
        const snapshot = await get(userRef);

        if (!snapshot.exists()) {
            await update(userRef, {
                id: userData.id,
                name: userData.first_name,
                lastname: userData.last_name,
                photo: userData.photo_url,
                coins: 10000,
                inventory: [],
                history: []
            });
            return NextResponse.json({
                success: true,
                item: {
                    id: userData.id,
                    coins: 10000,
                    inventory: [],
                    history: []
                }
            });
        }

        return NextResponse.json({
            success: true,
            item: snapshot.val()
        });

    } catch (error) {
        return NextResponse.json(
            { error: `Database error: ${error}` },
            { status: 500 }
        );
    }
}