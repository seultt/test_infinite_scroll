import { combineReducers, } from 'redux';
import data from './reducer_data';

const reducers = combineReducers({
    data:data,
})

export default reducers;