// eslint-disable-next-line import/no-anonymous-default-export
export default function(roadplanner = [], action) {
    if (action.type === 'addExperience') {
        return [...roadplanner, action.experience]
    } else if (action.type === 'toggleRoadplanner') {
        return action.roadtrip;
    } else {
        return roadplanner;
    }
}