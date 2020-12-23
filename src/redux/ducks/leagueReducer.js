
const INCREMENT = 'INCREMENT'
function incrementOriginal() {
  return { type: INCREMENT }
}

// const increment = createAction('INCREMENT')
// const decrement = createAction('DECREMENT')


// function counter(state = 0, action) {
//   switch (action.type) {
//     case increment.type:
//       return state + 1
//     case decrement.type:
//       return state - 1
//     default:
//       return state
//   }
// }

// const counter = createReducer(0, {
//     [increment.type]: state => state + 1,
//     [decrement.type]: state => state - 1
//   })
// = to below since toString() is overridden to .type
// const counter = createReducer(0, {
//     [increment]: state => state + 1,
//     [decrement]: state => state - 1
//   })

// That's where the createSlice function comes in. It allows us to provide an object with the reducer functions, and it will automatically generate the action type strings and action creator functions based on the names of the reducers we listed.

// const counterSlice = createSlice({
//     name: 'counter',
//     initialState: 0,
//     reducers: {
//       increment: state => state + 1,
//       decrement: state => state - 1
//     }
//   })
  
//   const store = configureStore({
//     reducer: counterSlice.reducer
//   })

  


  const store = Redux.createStore(counter)
// needs to specify to start devtools

// const store = configureStore({
//     reducer: counter
// })
// automatically starts dev tools

document.getElementById('increment').addEventListener('click', () => {
  store.dispatch(increment())
})

// document.getElementById('increment').addEventListener('click', () => {
//     store.dispatch(counterSlice.actions.increment())
//   })


//   to simplify
// const { actions, reducer } = counterSlice
// const { increment, decrement } = actions