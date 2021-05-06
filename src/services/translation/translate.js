/**** a costum translation function here , we can use i18n for the translation ******/
const languageDb = require('./constants/fr')
export function Translate(type, children) {
    try {
        if (children in languageDb[type]) {
            return languageDb[type][children];
        }
        return children;
    } catch (err) {
        console.error("Error while translating::translateWord", err);
        return children;
    }
}