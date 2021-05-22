// eslint-disable-next-line import/no-anonymous-default-export
export default function(user = {}, action) {
    if (action.type === 'stayLogged') {
        return action.user;
    } else if (action.type === 'logout') {
        return {};
    } else {
        return user;
    }
}