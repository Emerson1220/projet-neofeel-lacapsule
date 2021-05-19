// eslint-disable-next-line import/no-anonymous-default-export
export default function(user = {}, action) {
    if (action.type === 'signin') {
        let newUser = { 
            token: action.data.token,
            pseudo: action.data.pseudo 
        };
        return newUser;
    } else if (action.type === 'signup') {
        let newUser = { 
            token: action.data.token,
            pseudo: action.data.pseudo 
        };
        return newUser;
    } else {
        return user;
    }
}