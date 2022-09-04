export const loginActionUser = (actionType, payload) => {
    if (actionType && !payload) {
        return { type: actionType }
    }
    if (actionType && payload) {
        return {
            type: actionType,
            payload
        }
    }
}