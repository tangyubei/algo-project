var nodes = [
    {name: '1', color:'red'},
    {name: '2', color: 'orange'},
    {name: '3', color:'green'},
    {name: '4', color: 'blue'},
    {name: '5', color: 'purple'},
]

var links = [
    {source: 0, target: 1, label: 3, direction: 2, color: 'red'},
    {source: 2, target: 0, label: 8, direction: 1, color: 'orange'},
    {source: 0, target: 2, label: 8, direction: 2, color: 'green'},
    {source: 0, target: 4, label: -4, direction: 1, color: 'blue'},
    {source: 1, target: 4, label: 7, direction: 1, color: 'purple'},
    {source: 4, target: 1, label: 12, direction: 2, color: 'red'},
    {source: 1, target: 3, label: 1, direction: 1, color: 'orange'},
    {source: 2, target: 1, label: 4, direction: 1, color: 'green'},
    {source: 3, target: 2, label: -5, direction: 1, color: 'blue'},
    {source: 3, target: 0, label: 2, direction: 1, color: 'purple'},
    {source: 4, target: 3, label: 6, direction: 1, color: 'red'},
]

var adj_mat = [
    [0, 3, 8, '∞', -4],
    ['∞', 0, '∞', 1, 7],
    ['∞', 4, 0, '∞', '∞'],
    [2, '∞', -5, 0, 6],
    ['∞', '∞', '∞', 6, 0],
];


var data = [
    {stage: 1, matrix: [
    [0, 3, 8, '∞', -4],
    ['∞', 0, '∞', 1, 7],
    ['∞', 4, 0, '∞', '∞'],
    [2, '∞', -5, 0, 6],
    ['∞', '∞', '∞', 6, 0],
]},
    {
        stage:2 , matrix: [
            [0, 3, 8, 2, -4],
            [3, 0, -4, 1, 7],
            ['∞', 4, 0, 5, 11],
            [2, -1, -5, 0, -2],
            [8, '∞', 1, 6, 0],
        ]
    }
]

var data2 = [
    [0, 3, 8, '∞', -4],
    ['∞', 0, '∞', 1, 7],
    ['∞', 4, 0, '∞', '∞'],
    [2, '∞', -5, 0, 6],
    ['∞', '∞', '∞', 6, 0],
    [0, 3, 8, 2, -4],
    [3, 0, -4, 1, 7],
    ['∞', 4, 0, 5, 11],
    [2, -1, -5, 0, -2],
    [8, '∞', 1, 6, 0],
]

var L = [[0, 3, 8, '∞', -4],
    ['∞', 0, '∞', 1, 7],
    ['∞', 4, 0, '∞', '∞'],
    [2, '∞', -5, 0, 6],
    ['∞', '∞', '∞', 6, 0],
    [0, 3, 8, 2, -4],
    [3, 0, -4, 1, 7],
    ['∞', 4, 0, 5, 11],
    [2, -1, -5, 0, -2],
    [8, '∞', 1, 6, 0],
    [0,1,-3,2,-4],
    [3,0,-4,1,-1],
    [7,4,0,5,3],
    [2,-1,-5,0,-2],
    [8,5,1,6,0],
]
