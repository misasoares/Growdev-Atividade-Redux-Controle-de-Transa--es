import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from "@reduxjs/toolkit";


export interface transactionsType{
    id:string
    description:string
    value:number
    type:"Entrada" | "Saída"
}

const initialState: transactionsType[] = []

const transactionsSlice = createSlice({
    name:'transactions',
    initialState,
    reducers:{
        addTransaction:(state, action:PayloadAction<transactionsType>)=>{
            state.push(action.payload)
            return state
        },
    }
})

export const {addTransaction} = transactionsSlice.actions
export default transactionsSlice.reducer