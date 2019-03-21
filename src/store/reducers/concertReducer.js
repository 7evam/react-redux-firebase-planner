const initState = {}

const concertReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_CONCERT_SUCCESS':
      console.log(action.concert)
      return state;
    case 'CREATE_CONCERT_ERROR':
      console.log('create concert error', action.err);
      return state
    default:
      return state
  }
}

export default concertReducer
