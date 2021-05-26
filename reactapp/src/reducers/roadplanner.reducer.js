// eslint-disable-next-line import/no-anonymous-default-export
export default function(roadplanner = {}, action) {
    if (action.type === 'addExperience') {
        let temp = { ...roadplanner };
        temp.experiences.push(action.experience);
        return temp;
    } else if (action.type === 'newRoadplanner') {
        return {
            id: action.roadtripID,
            experiences: [action.experience]
        }
    } else if (action.type === 'loadRoadplanner') {
        return action.roadplanner;
    } else if (action.type === 'deleteExperience') {
        let temp = { ...roadplanner };
        temp.experiences = temp.experiences.filter(e => e._id !== action.experienceID);
        return temp;
    } else if (action.type === 'clearRoadplanner') {
        return {}
    }else if (action.type === 'toggleRoadplanner') {
        return action.roadplanner;
    } else {
        return roadplanner;
    }
}