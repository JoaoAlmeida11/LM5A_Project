
const { actions, reducer } = counterSlice
const { increment, decrement } = actions

  const counterSlice = createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {
      increment: state => state + 1,
      decrement: state => state - 1
    }
  })

// async
document.getElementById('increment').addEventListener('click', () => {
    store.dispatch(actions.increment())
  })



