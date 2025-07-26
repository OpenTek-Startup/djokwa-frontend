export interface IUserState {
  user: null | {
    _id: string
    fullname: string
    email: string
    userId: number
    role: 'admin' | 'teacher' | 'moderator' | 'student'
  }
}

import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: IUserState = {
  user: null
}

export const userrSlice = createSlice({
  name: 'currentloginuser',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<any>) => {
      console.log(action.payload, 'this action payload here')
      state.user = action.payload
    },
    removeUser: (state) => {
      state.user = null
    }
  }
})

export const { setUser, removeUser } = userrSlice.actions
export default userrSlice.reducer
