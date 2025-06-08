import { IItem } from "@/types/types";

export function getRandomItem(items: IItem[]) {
    const rand = Math.random();
    let cumulativeProb = 0;

    for (const item of items) {
        cumulativeProb += item.probability;
        if (rand < cumulativeProb) return item;
    }
    return items[0];
}


export const getNewId = (id: string, maxValue: number, direction: boolean): number => {
    const currentId = id.replace('box', '')

    if (direction && +currentId < maxValue) return +currentId + 1
    else if (!direction && +currentId > 1) return +currentId - 1
    return +currentId
}