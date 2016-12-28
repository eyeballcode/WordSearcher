module.exports = (graph, searchString) => {
    var graphString = graph.reduce((prev, curr) => prev + curr.join('') + '\n', '');
    var size = graph[0].length;
    const pos = graphString.indexOf(searchString);
    if (pos !== -1) {
        var y = (pos + pos % size) / size - 1;
        var x = pos % size - 1;
        return {
            found: true,
            x: x,
            y: y,
            eX: x + 2,
            eY: y
        };
    } else {
        return {
            found: false
        };
    }
}
