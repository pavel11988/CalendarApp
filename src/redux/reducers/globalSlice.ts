import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IGlobalState {
    isModalOpen: boolean
}

const initialState: IGlobalState = {
    isModalOpen: false,
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        toggleModal(state, action: PayloadAction<boolean>) {
            state.isModalOpen = action.payload
        },
    },
})

export default globalSlice.reducer
