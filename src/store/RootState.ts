import { combineReducers } from 'redux';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import regionReducer from './regionSlice';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  region: regionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;