import {createStore, combineReducers} from "redux";

//ADD EXPENSE
//REMOVE EXPENSE
// EDIT EXPENSE
//SET_TEXT_FILTER
const expensesReducerDefaultState = [];
const expensesReducer = (state= expensesReducerDefaultState,action) => {
    switch (action.type){
        default:
            return state;
    };

}

const filterReducerDefaultState = {
    text:"",
    sortBy:"date",
    startDate:undefined,
    endDate:undefined,
};
const filterReducer = (state= filterReducerDefaultState,action) => {
    switch (action.type){
        default:
            return state;
    };

}

const store=createStore(
    combineReducers({
        expenses: expensesReducer,
        filters:filterReducer
    })
);

console.log(store.getState());
const demoState= {
    expenses:[{
        id:"asdasdasd",
        description:"January Rent",
        note: "This was the final payment",
        amont: 54500,
        createAt: 0
    }],
    filters:{
        text:"rent",
        sortBy:"amount",
        startDate:undefined,
        endDate:undefined,
    }
};

