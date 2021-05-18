/* eslint-disable import/no-anonymous-default-export */
export default function(region = '', action) {
    if (action.type === 'selectRegion') {
        return action.region
    } else {
        return region;
    }
}