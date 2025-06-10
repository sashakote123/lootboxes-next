import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILaunchParams } from '@/types/types';


const initialState: ILaunchParams = {
    tgWebAppData: {
        user: {
            first_name: '',
            last_name: '',
            photo_url: '',
            id: 0
        }
    }

};

const paramsSlice = createSlice({
    name: 'params',
    initialState,
    reducers: {
        updateParams: (state, action: PayloadAction<ILaunchParams>) => {
            state.tgWebAppData.user = action.payload.tgWebAppData.user;
        },

    },
});

export const { updateParams } = paramsSlice.actions;
export default paramsSlice.reducer;