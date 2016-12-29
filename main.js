const graph = require('./graph');
const configs = require('./config');
const fs = require('fs');

var searchFunctions = [
    'horizontal',
    'horizontalBack',
    'vertical',
    'verticalUp',
    'diagonal',
    'diagonalUp',
    'diagonalBack',
    'diagonalUpBack'
];

var orientations = {
    horizontal:     function(x,y,i) { return {x: x+i, y: y  }; },
    horizontalBack: function(x,y,i) { return {x: x-i, y: y  }; },
    vertical:       function(x,y,i) { return {x: x,   y: y+i}; },
    verticalUp:     function(x,y,i) { return {x: x,   y: y-i}; },
    diagonal:       function(x,y,i) { return {x: x+i, y: y+i}; },
    diagonalBack:   function(x,y,i) { return {x: x-i, y: y+i}; },
    diagonalUp:     function(x,y,i) { return {x: x+i, y: y-i}; },
    diagonalUpBack: function(x,y,i) { return {x: x-i, y: y-i}; }
};

var isValidPosition = {
    horizontal:     function(x,y,h,w,l) { return w >= x + l; },
    horizontalBack: function(x,y,h,w,l) { return x + 1 >= l; },
    vertical:       function(x,y,h,w,l) { return h >= y + l; },
    verticalUp:     function(x,y,h,w,l) { return y + 1 >= l; },
    diagonal:       function(x,y,h,w,l) { return (w >= x + l) && (h >= y + l); },
    diagonalBack:   function(x,y,h,w,l) { return (x + 1 >= l) && (h >= y + l); },
    diagonalUp:     function(x,y,h,w,l) { return (w >= x + l) && (y + 1 >= l); },
    diagonalUpBack: function(x,y,h,w,l) { return (x + 1 >= l) && (y + 1 >= l); }
};

const height = graph.length;
const width = graph[0].length;

for (let searcher of searchFunctions) {
    console.log('Searching ' + searcher);
    for (let y = 0; y < graph.length; y++) {
        for (let x = 0; x < graph[0].length; x++) {
            if (isValidPosition[searcher](x, y, height, width, configs.searchString.length)) {
                var data = [];
                for (let i = 0; i < configs.searchString.length; i++) {
                    const positions = orientations[searcher](x,y,i);
                    data.push(graph[positions.y][positions.x]);
                }
                if (data.join('') === configs.searchString) {
                    console.log(`X:  ${x}`);
                    console.log(`Y:  ${y}`);
                    console.log(`eX: ${orientations[searcher](x,y,configs.searchString.length).x}`);
                    console.log(`eY: ${orientations[searcher](x,y,configs.searchString.length).y}`);
                }
            }
        }
    }
}
