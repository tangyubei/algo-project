// var data = [[0,1],[2,3]];

// var data = [
// [1,2,3,4,5],
//     [6,7, 8,9, 10],
//     [11,12,13,14,15],
//     [16,17,18,19,20],
//     [21,22,23,24,25]
// ];

var data = [
    [0, 3, 3, '∞', 3],
    ['∞', 0, '∞', 1, 7],
    ['∞', 4, 0, '∞', '∞'],
    [2, '∞', -5, 0, 6],
    ['∞', '∞', '∞', 6, 0],
];

const local = d3.local();

function myMatrix2(data) {

    var margin = {top: 50, right: 100, bottom: 50, left: 100},
        width = 250,
        height = 250;

    const svg = d3
        .select('.grid2')
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    numrows = data.length;
    numcols = data[0].length;

    rw=width/numrows;
    hw=height/numcols;

    var x = d3.scaleOrdinal()
        .domain(d3.range(numcols))
        .range(d3.range(0,width,width/numcols));

    var y = d3.scaleOrdinal()
        .domain(d3.range(numrows))
        .range(d3.range(0,height,height/numrows));

    var row = svg.selectAll(".row")
        .data(data)
        .enter().append("g")
        .attr("class", "row")
        .attr("transform", function(d, i) { local.set(this, i); return "translate(0," + y(i) + ")"; });

    var cell = row.selectAll(".cell")
        .data(function(d) { return d; })
        .enter().append("g")
        .attr("class", "cell")
        .attr("transform", function(d, i) { return "translate(" + x(i) + ", 0)"; });

    cell.append('rect')
        .attr("width", rw)
        .attr("height", hw)
        .style("stroke", "black")
        .style("stroke-width", "2px")
        .style("fill", 'white')

        var k = 0;
    cell.append("text") //Add matrix elements
        .attr("dy", ".32em")
        .attr("x", rw/2 )
        .attr("y", hw/2 )
        .attr("text-anchor", "middle")
        .style("font-size","14px")
        .transition() //Delay starts here
        .delay(function(d, i) {
            const p = local.get(this);
            console.log("p: "+p+"; i: "+i+"; d: "+d)
            return p * 1000 + i * (1000/ numrows);
            //return i * 1000 + p * (1000 / numrows);
        })
        .text(function(d) { return d; })

    function timeDelay(d,i,k) {
        //console.log("d: "+d+"; i: "+i);
        if (k == numrows - 1) {
            temp = 0;
        }
        else {
            temp = k;
        }
        for (let j = temp; j < numrows; j++) {
            if (data[j][i] == d) {
                k = j;
                console.log("d: "+d + ";i: "+i+"; k: "+k)
                return k;
            }
        }
    }

    // function timeDelay(d,i,k) {
    //     //console.log("d: "+d+"; i: "+i);
    //     if (k == numrows - 1) {
    //         temp = 0;
    //     }
    //     else {
    //         temp = k;
    //     }
    //     for (let j = temp; j < numrows; j++) {
    //         if (data[j][i] == d) {
    //             k = j;
    //             console.log("d: "+d + ";i: "+i+"; k: "+k)
    //             return k;
    //         }
    //     }
    // }
    // var labels = svg.append('g')
    //     .attr('class', "labels");
    //
    // var columnLabels = labels.selectAll(".column-label")
    //     .data(vertices)
    //     .enter().append("g")
    //     .attr("class", "column-label")
    //     .attr("transform", function(d, i) { return "translate(" + x(i) + "," + height + ")"; });
    //
    // columnLabels.append("circle")
    //     .attr("cx", rw/2)
    //     .attr("cy", -270)
    //     .attr("r", 12)
    //     .style("fill", function(d) {return d.color});
    //
    // columnLabels.append("text")
    //     .attr("x", rw/2)
    //     .attr("y", -270)
    //     .attr("dy", ".32em")
    //     .attr("text-anchor", "middle")
    //     //.attr("transform", "rotate(-60)")
    //     .style("font-size","14px")
    //     .text(function(d, i) { return d.name; });
    //
    // var rowLabels = labels.selectAll(".row-label")
    //     .data(vertices)
    //     .enter().append("g")
    //     .attr("class", "row-label")
    //     .attr("transform", function(d, i) { return "translate(" + 0 + "," + y(i) + ")"; });
    //
    // rowLabels.append("circle")
    //     .attr("cx",-20)
    //     .attr("cy", hw/2)
    //     .attr("r", 12)
    //     .style("fill", function(d) {return d.color});
    //
    // rowLabels.append("text")
    //     .attr("x", -20)
    //     .attr("y", hw/2)
    //     .attr("dy", ".32em")
    //     .attr("text-anchor", "middle")
    //     .style("font-size","14px")
    //     .text(function(d, i) { return d.name; });

    return;
};