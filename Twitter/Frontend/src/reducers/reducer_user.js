import {
  LOGIN_USER,
  GET_PROFILE,
  UPDATE_PROFILE,
  
} from '../actions'

export default function (state, action) {
  switch (action.type) {
    case GET_PROFILE:
      return action.payload
    case UPDATE_PROFILE:
      return action.payload
    case LOGIN_USER:
      return action.payload
    
    default:
      return { ...state }
  }
}
