// heatmap.js
document.addEventListener('DOMContentLoaded', function() {
    const svg = d3.select("#heatmap");
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    
    // Create a tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Load the JSON data
    d3.json("heatmap_data.json").then(data => {
        // Scale for the x and y coordinates
        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.x))
            .range([0, width]);
        const yScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.y))
            .range([height, 0]);

        // Define color scale
        const colorScale = d3.scaleSequential(d3.interpolateViridis)
            .domain(d3.extent(data, d => d.predicted_grade));

        // Add squares to the heatmap
        svg.selectAll("rect")
            .data(data)
            .enter().append("rect")
            .attr("x", d => xScale(d.x))
            .attr("y", d => yScale(d.y))
            .attr("width", 10)  // Width of each square
            .attr("height", 10) // Height of each square
            .style("fill", d => colorScale(d.predicted_grade))
            .on("mouseover", function(event, d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(`Predicted Grade: ${d.predicted_grade.toFixed(2)}<br>Posts: ${Math.round(d.x)}<br>Replies: ${Math.round(d.y)}`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
        
    });
});
