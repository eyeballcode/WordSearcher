module.exports = (graph, searchString) => {
    var width = graph[0].length;
    var height = graph.length;
    var searchSize = searchString.length;
    var offset =  searchSize - 1
    for (var rowCounter = offset; rowCounter < height; rowCounter++) {
        for (var colLeftCount = 0; colLeftCount < width; colLeftCount++) {
            var search = [];
            for (var row = rowCounter; row !== rowCounter - searchSize; row--) {
                search.push(graph[row][colLeftCount]);
            }
            if (search.join('') === searchString) {
                return {
                    found: true,
                    x: colLeftCount,
                    y: rowCounter,
                    eX: colLeftCount,
                    eY: rowCounter - 2
                }
            }
        }
    }
    return{};
}
