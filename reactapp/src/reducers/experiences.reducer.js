// eslint-disable-next-line import/no-anonymous-default-export
export default function(experiences = [], action) {
    if (action.type === 'search') {
        return action.experiences
    } else {
        return experiences
    }
}