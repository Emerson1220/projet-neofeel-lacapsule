// eslint-disable-next-line import/no-anonymous-default-export
export default function(token = '', action) {
    if (action.type === 'signin') {
        return action.token;
    } else if (action.type === 'signup') {
        return action.token;
    } else {
        return token;
    }
}