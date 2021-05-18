/* eslint-disable import/no-anonymous-default-export */
export default function(activities = [], action) {
    console.log('reducer activities')
    if (action.type === 'selectActivities') {
        return action.activities
    } else {
        return activities;
    }
}