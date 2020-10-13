import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import profile from './profile';
import post from './post'

export default combineReducers({
    alert,
    auth,
    profile,
    post
});