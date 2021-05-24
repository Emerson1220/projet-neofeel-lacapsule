// eslint-disable-next-line import/no-anonymous-default-export
export default function(suggestions = [], action) {
    if (action.type === 'loadSuggestions') {
        return action.suggestions;
    } else {
        return suggestions;
    }
}