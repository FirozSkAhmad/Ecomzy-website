import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: []
}

const Cartslice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        add: (state, action) => {
            state.value.push(action.payload)
        },
        remove: (state, action) => {
            state.value = state.value.filter((itemData) => action.payload.id !== itemData.id)
        }
    }
})

export const { add, remove } = Cartslice.actions
export default Cartslice.reducer