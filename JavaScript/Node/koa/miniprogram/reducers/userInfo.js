const INITIAL_STATE = {
  data: null
}
const User = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "MODIFY_USER": return { state, ...action.data }
    default:   return state
  }
}
export default User
