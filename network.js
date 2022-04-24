function myNetwork(nodes, links) {
    const margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    };
    const width = 700 - (margin.left + margin.right);
    const height = 350 - (margin.top + margin.bottom);

    const svg = d3
        .select('.viz')
        .append('svg')
        .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
        .attr('width', width)
        .attr('height', height)
        .append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    svg.append('defs').append('marker')
        .attr("id",'arrowhead')
        .attr('viewBox','-0 -5 10 10') //the bound of the SVG viewport for the current SVG fragment. defines a coordinate system 10 wide and 10 high starting on (0,-5)
        .attr('refX',23) // x coordinate for the reference point of the marker. If circle is bigger, this need to be bigger.
        .attr('refY',0)
        .attr('orient','auto')
        .attr('markerWidth',5)
        .attr('markerHeight',10)
        .attr('xoverflow','visible')
        .append('svg:path')
        .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
        .attr('fill', '#999')
        .style('stroke','none');

    var simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-750))
        .force("link", d3.forceLink(links).distance(150).strength(1).iterations(30))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .stop();

    var loading = svg.append("text")
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .text("Simulating. One moment please…");

// Use a timeout to allow the rest of the page to load first.
    d3.timeout(function() {
        loading.remove();

        // See https://github.com/d3/d3-force/blob/master/README.md#simulation_tick
        for (var i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
            simulation.tick();
        }

        var link2 = svg.append("g")
            .selectAll("path")
            .data(links)
            .enter()
            .append("line")
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; })
            .attr("class", "path")
            .attr('marker-end','url(#arrowhead)')

        /*
        var link = svg.append("g")
            .selectAll("line")
            .data(links)
            .enter().append("line")
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; })
            .attr("marker-end","url(#end-arrow)");
*/

        var link_label = svg.append("g")
            .selectAll('text')
            .data(links)
            .join('text')
            .text(function(d) { return d.label })
            .attr("x", function(d) {
                if (d.target.x > d.source.x) {
                    return (d.source.x + (d.target.x - d.source.x)/2 - 3); }
                else {
                    return (d.target.x + (d.source.x - d.target.x)/2 -3); }
            })
            .attr("y", function(d) {
                if (d.target.y > d.source.y) {
                    return (d.source.y + (d.target.y - d.source.y)/2 +3); }
                else {
                    return (d.target.y + (d.source.y - d.target.y)/2 +3); }
            })



        var node = svg.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")

        node.append("circle")
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
            .attr("r", 8);

        node.append("text")
            .attr("x", function(d) {return d.x;})
            .attr("y", function(d) {return d.y+3;})
            .attr('text-anchor', "middle")
            .text(function(d) { return d.name });


        /*
            var node = svg.append("g")
                .selectAll("circle")
                .data(nodes)
                .enter().append("circle")
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; })
                .attr("r", 6);
            var node_label = svg.append("g")
                .selectAll('text')
                .data(nodes)
                .join('text')
                .text(function(d) { return d.name })
                .attr('x', function(d) { return d.x })
                .attr('y', function(d) { return d.y })
                .attr('dy', function(d) { return -3 })
                .attr('dx', function(d) { return 5 });
        */
    });
    return;
}// in the .viz container add an svg element following the margin convention
