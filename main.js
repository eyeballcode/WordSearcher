const graph = require('./graph');
const configs = require('./config');
const fs = require('fs');
var searchFunctions = [];

fs.readdir('./searchers', (err, files) => {
    searchFunctions = files.map(e => require(`./searchers/${e}`));
    for (let searcher of searchFunctions) {
        const {found, x, y, eX, eY} = searcher(graph, configs.searchString);
        if (found) {
            console.log(`X: ${x}`);
            console.log(`Y: ${y}`);
            console.log(`eX: ${eX}`);
            console.log(`eY: ${eY}`);
            return;
        }
    }
    console.log('Could not find the search string!');
});
