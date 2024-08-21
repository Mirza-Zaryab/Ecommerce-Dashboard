import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './Reducers/authSlice';
import { gernalReducer } from './Reducers/gernalSlice';

export default combineReducers({
    gernalReducer: gernalReducer,
    authReducer: authReducer,
});
