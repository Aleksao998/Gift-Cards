console.log("Redux-101 Page");

import {createStore} from 'redux';

const incrementCount = (payload = {}) => {
    return{
        type: "INCREMENT",
        incrementBy: payload.incrementBy ? payload.incrementBy : 1
    }
}

const store = createStore((state = {count: 0}, action)=>{
    switch(action.type){
        case "INCREMENT":
            return{
                count:state.count+action.incrementBy
            };
        case "DECREMENT":
            return{
                count:state.count-1
            };
        default:
            return state;
    }
});
const unsubscribe=store.subscribe(()=>{
    console.log(store.getState());
});


store.dispatch(incrementCount({incrementBy:5}));

store.dispatch({
    type: "DECREMENT"
});

store.dispatch(incrementCount());




unsubscribe();


