function myMatrix(data, vertices) {

    var margin = {top: 50, right: 10, bottom: 50, left: 130},
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
        .attr("transform", function(d, i) {return "translate(0," + y(i) + ")"; });

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

    cell.append("text")
        .attr("dy", ".32em")
        .attr("x", rw/2 )
        .attr("y", hw/2 )
        .attr("text-anchor", "middle")
        .style("font-size","14px")
        .text(function(d) { return d; })

    var box = [0, rw, 2*rw, 3*rw, 4*rw, 0, rw, 2*rw, 3*rw, 4*rw,  0, rw, 2*rw, 3*rw, 4*rw,  0, rw, 2*rw, 3*rw, 4*rw,0, rw, 2*rw, 3*rw, 4*rw]
    var highlight_horizontal = svg.append("rect")
        .data(box)
        .style("stroke", "black")
        .style("stroke-width", "2px")
        .style("fill", 'green')
        .style("opacity", 0.25)
        .attr("width", rw)
        .attr("height", height)
        .attr("x",0)
        .transition()
        .delay(10)
        .on('start', function repeat () {
            for (let j = 0; j<25; j++) {
                d3.select(this)
                    .transition()
                    .delay(j*2000)
                    .duration(2000)
                    .attr("x",box[j])
                    .transition()
                    .delay(100)
                    .style("opacity",0)
                //.attr("transform","translate("+rw+",0)")
            }
        });

    var highlight_vertical = svg.append("rect")
        .style("stroke", "black")
        .style("stroke-width", "2px")
        .style("fill", 'pink')
        .style("opacity", 0.25)
        .attr("width", width)
        .attr("height", hw)
        .attr("x",0)
        .transition()
        .delay(10)
        .on('start', function repeat () {
            for (let j = 0; j<5; j++) {
                d3.active(this)
                    .transition()
                    .delay(j*10000)
                    .duration(2000)
                    .attr("y",j*hw)
                //.attr("transform","translate("+rw+",0)")
            }
        });

    var highlight_cell = svg.append("rect")
        .style("stroke", "yellow")
        .style("stroke-width", "4px")
        .style("fill", "none")
        .attr("width", rw)
        .attr("height", hw)
        .attr("x",0)
        .transition()
        .delay(500)
        .on('start', function repeat () {
            for (let j = 0; j<5; j++) {
                d3.active(this)
                    .transition()
                    .delay(j*10000)
                    .duration(2000)
                    .attr("y",j*hw)
            }
        });

        // .on("start", function repeat() {
        //     d3.select(this)
        //         //.style("fill", "magenta")
        //
        //         .styleTween("transform","translate("+rw+",0)")
        //         .transition()
        //         .delay(1000)
        //         .on("start",repeat)
        // })

    var labels = svg.append('g')
        .attr('class', "labels");

    var columnLabels = labels.selectAll(".column-label")
        .data(vertices)
        .enter().append("g")
        .attr("class", "column-label")
        .attr("transform", function(d, i) { return "translate(" + x(i) + "," + height + ")"; });

    columnLabels.append("circle")
        .attr("cx", rw/2)
        .attr("cy", -270)
        .attr("r", 12)
        .style("fill", function(d) {return d.color});

    columnLabels.append("text")
        .attr("x", rw/2)
        .attr("y", -270)
        .attr("dy", ".32em")
        .attr("text-anchor", "middle")
        //.attr("transform", "rotate(-60)")
        .style("font-size","14px")
        .text(function(d, i) { return d.name; });

    var rowLabels = labels.selectAll(".row-label")
        .data(vertices)
        .enter().append("g")
        .attr("class", "row-label")
        .attr("transform", function(d, i) { return "translate(" + 0 + "," + y(i) + ")"; });

    rowLabels.append("circle")
        .attr("cx",-20)
        .attr("cy", hw/2)
        .attr("r", 12)
        .style("fill", function(d) {return d.color});

    rowLabels.append("text")
        .attr("x", -20)
        .attr("y", hw/2)
        .attr("dy", ".32em")
        .attr("text-anchor", "middle")
        .style("font-size","14px")
        .text(function(d, i) { return d.name; });

return;
};
