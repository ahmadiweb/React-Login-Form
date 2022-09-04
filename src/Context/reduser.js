export const actionType = {
    LOGIN_REQUST: 'LOGIN_REQUST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',
    LOGOUT: 'LOGOUT'
}

export const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null
}

export const reduser = (state, action) => {
    switch (action.type) {
        case actionType.LOGIN_REQUST:
            return {
                ...state,
                user: null,
                token: null,
                loading: true,
            }
        case actionType.LOGIN_SUCCESS:
            const { user, token } = action.payload
            return {
                user: user,
                token: token,
                loading: false,
            }
        case actionType.LOGOUT:
            return {
                user: null,
                token: null,
                loading: false,
            }

        default:
            throw Error('password or username is wrang')
    }
}