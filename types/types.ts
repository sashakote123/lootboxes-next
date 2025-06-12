export enum rarities {
    white = 'white',
    wblue = 'wblue',
    blue = 'blue',
    purple = 'purple',
    pink = 'pink',
    red = 'red',
    gold = 'gold',
}

export interface IUres {
    name: string,
    lastname?: string,
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

export interface ILaunchParams {
    tgWebAppData: {
        user: {
            first_name: string,
            last_name: string,
            photo_url: string,
            id: number
        }
    }
}


export interface IDailies {
    image: string,
    name: string,
    description: string,

    type: string,
    cooldown: number,
    action?: string,
    isComplete?: boolean,
    reward?: number | string,
    timer?: string
}