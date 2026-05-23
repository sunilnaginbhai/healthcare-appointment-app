const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case 'AUTH_LOGOUT':
      return initialState;
    case 'AUTH_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
