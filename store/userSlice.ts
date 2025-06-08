import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IHistoryItem, IItem, IUres } from '@/types/types';


const initialState: IUres = {
    name: '',
    id: 0,
    inventory: [],
    coins: -1,
    history: []
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateCoins: (state, action: PayloadAction<number>) => {
            state.coins = action.payload;
        },
        updateInventory: (state, action: PayloadAction<IItem[]>) => {
            state.inventory = action.payload;
        },
        updateHistory: (state, action: PayloadAction<IHistoryItem[]>) => {
            state.history = action.payload;
        },
        addItem: (state, action: PayloadAction<IItem>) => {
            state.inventory.push(action.payload);
        },
        addHistory: (state, action: PayloadAction<IHistoryItem>) => {
            state.history.push(action.payload);
        },
    },
});

export const { updateCoins, addItem, updateInventory, updateHistory, addHistory } = userSlice.actions;
export default userSlice.reducer;