const DEFAULT_STATE = {
  isLoading:false,
  errorState:false,
  posts: []
}

const data = (state =DEFAULT_STATE, action = null) => {
  if(action.type === 'DATA_REQUEST') {
    return {
      ...state,
      isLoading: true,
    }
  }
  if(action.type === 'DATA_SUCCESS') {
    const temp = state.posts
    return {
      ...state,
      isLoading: false,
      posts: [...action.payload, ...temp]
    }
  }
  
  return {
    ...state,
  }
}

export default data;