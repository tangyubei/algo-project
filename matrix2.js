const local = d3.local();

function myMatrix2(data, vertices) {

    var margin = {top: 50, right: 10, bottom: 50, left: 50},
        width = 250,
        height = 250;

    const svg = d3
        .select('.grid')
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    numrows = data.length;
    numcols = data[0].length;

    rw = width / numrows;
    hw = height / numcols;

    var x = d3.scaleOrdinal()
        .domain(d3.range(numcols))
        .range(d3.range(0, width, width / numcols));

    var y = d3.scaleOrdinal()
        .domain(d3.range(numrows))
        .range(d3.range(0, height, height / numrows));

    var row = svg.selectAll(".row")
        .data(data)
        .enter().append("g")
        .attr("class", "row")
        .attr("transform", function (d, i) {
            local.set(this, i);
            return "translate(0," + y(i) + ")";
        });

    var cell = row.selectAll(".cell")
        .data(function (d) {
            return d;
        })
        .enter().append("g")
        .attr("class", "cell")
        .attr("transform", function (d, i) {
            return "translate(" + x(i) + ", 0)";
        });

    cell.append('rect')
        .attr("width", rw)
        .attr("height", hw)
        .style("stroke", "black")
        .style("stroke-width", "2px")
        .style("fill", 'white')

    var k = 0;
    cell.append("text") //Add matrix elements
        .attr("dy", ".32em")
        .attr("x", rw / 2)
        .attr("y", hw / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .transition() //Delay starts here
        .delay(function (d, i) {
            const p = local.get(this);
            console.log("p: " + p + "; i: " + i + "; d: " + d)
            return 2000+p * 10000 + i * (10000 / numrows);
        })
        .text(function (d) {
            return d;
        })
    /*
    cell.append("text") //Add matrix elements
        .attr("dy", ".32em")
        .attr("x", rw / 2)
        .attr("y", hw / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .transition() //Delay starts here
        .delay(function (d, i) {
            const p = local.get(this);
            console.log("p: " + p + "; i: " + i + "; d: " + d)
            return p * 10000 + i * (10000 / numrows);
        })
        .text(function (d) {
            return d;
        })
        */


    var labels = svg.append('g')
        .attr('class', "labels");

    var columnLabels = labels.selectAll(".column-label")
        .data(vertices)
        .enter().append("g")
        .attr("class", "column-label")
        .attr("transform", function (d, i) {
            return "translate(" + x(i) + "," + height + ")";
        });

    columnLabels.append("circle")
        .attr("cx", rw / 2)
        .attr("cy", -270)
        .attr("r", 12)
        .style("fill", function (d) {
            return d.color
        });

    columnLabels.append("text")
        .attr("x", rw / 2)
        .attr("y", -270)
        .attr("dy", ".32em")
        .attr("text-anchor", "middle")
        //.attr("transform", "rotate(-60)")
        .style("font-size", "14px")
        .text(function (d, i) {
            return d.name;
        });

    var rowLabels = labels.selectAll(".row-label")
        .data(vertices)
        .enter().append("g")
        .attr("class", "row-label")
        .attr("transform", function (d, i) {
            return "translate(" + 0 + "," + y(i) + ")";
        });

    rowLabels.append("circle")
        .attr("cx", -20)
        .attr("cy", hw / 2)
        .attr("r", 12)
        .style("fill", function (d) {
            return d.color
        });

    rowLabels.append("text")
        .attr("x", -20)
        .attr("y", hw / 2)
        .attr("dy", ".32em")
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text(function (d, i) {
            return d.name;
        });
    return;
}