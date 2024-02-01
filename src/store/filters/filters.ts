import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IInitialStateFilters } from './filters.interface'

const initialState: IInitialStateFilters = {
  minPrice: 0,
  maxPrice: 0,
  category: undefined,
  rating: undefined,
  searchTerm: ''
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload
    },
    changeMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload
    },
    changeCategory: (state, action: PayloadAction<number | undefined>) => {
      state.category = action.payload
    },
    changeRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload
    },
    changeSearch: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    clearFilters: (state) => {
      state.minPrice = 0
      state.maxPrice = 0
      state.category = undefined
      state.rating = undefined
      state.searchTerm = ''
    }
  },
})

export const { changeMinPrice, changeMaxPrice, changeCategory, changeRating, clearFilters, changeSearch } = filtersSlice.actions
export default filtersSlice.reducer