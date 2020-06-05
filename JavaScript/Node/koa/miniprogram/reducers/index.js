import { createStore, combineReducers } from './redux.min.js'
import userInfo from './userInfo'

export default createStore(combineReducers({
  userInfo
})) 