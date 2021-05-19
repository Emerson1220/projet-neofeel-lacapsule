/* eslint-disable import/no-anonymous-default-export */
export default function(activities = [], action) {
    if (action.type === 'selectActivities') {
        return action.activities
    } else {
        return activities;
    }
}