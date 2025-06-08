export enum rarities {
    white = 'white',
    wblue = 'wblue',
    blue = 'blue',
    purple = 'purple',
    pink = 'pink',
    red = 'red',
    gold = 'gold',
}

export interface IUres{
    name: string,
    id: number,
    inventory: IItem[],
    coins: number,
    history: IHistoryItem[]

}
export interface IItem {
    image: string,
    name: string,
    rarity: rarities,
    probability: number
}

export interface IOpnenCase {
    img: string,
    price: number,
    items: IItem[],


}

export interface IHistoryItem {
    item: IItem
    timestamp: Date,
}