import { useSelector } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import themeSlice from './themeSlice'

export const reducer = combineReducers({
  themeSlice: themeSlice.reducer,
  user: userSlice
})

export const store = configureStore({
  reducer
})
export type rootState = ReturnType<typeof store.getState>

const useGetLoginUser = () => {
  // if the user is login get the user information when s/he logins action will trigger and sotre the user information to redux-toolkit
  const user = useSelector((state: rootState) => state.user.user)
  console.log('user in utils', user)
  return user
}
export default useGetLoginUser
