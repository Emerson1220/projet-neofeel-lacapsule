// eslint-disable-next-line import/no-anonymous-default-export
export default function(roadplanner = [], action) {
    if (action.type === 'addExperience') {
        return [...roadplanner, action.experience]
    } else {
        return roadplanner;
    }
}