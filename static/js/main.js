document.addEventListener("DOMContentLoaded", function () {
    let allData = [];

    fetch("/api/data")
        .then(response => response.json())
        .then(data => {
            allData = data;
            updateCharts(data);
            populateTable(data);
        });

    function applyFilters() {
        let filteredData = allData.filter(d => {
            return (
                (document.getElementById("endYearFilter").value === "" || d.end_year.includes(document.getElementById("endYearFilter").value)) &&
                (document.getElementById("topicsFilter").value === "" || d.topics.includes(document.getElementById("topicsFilter").value)) &&
                (document.getElementById("regionFilter").value === "" || d.region.includes(document.getElementById("regionFilter").value)) &&
                (document.getElementById("countryFilter").value === "" || d.country.includes(document.getElementById("countryFilter").value))
            );
        });

        populateTable(filteredData);
        updateCharts(filteredData);
    }

    function populateTable(data) {
        let tableBody = document.getElementById("dataTable");
        tableBody.innerHTML = "";
        data.forEach(d => {
            tableBody.innerHTML += `
                <tr>
                    <td>${d.intensity}</td>
                    <td>${d.likelihood}</td>
                    <td>${d.relevance}</td>
                    <td>${d.year}</td>
                    <td>${d.country}</td>
                    <td>${d.topics}</td>
                    <td>${d.region}</td>
                    <td>${d.city}</td>
                </tr>
            `;
        });
    }

    function updateCharts(data) {
        d3.select("#barChart").selectAll("*").remove();
        d3.select("#lineChart").selectAll("*").remove();
        d3.select("#countryChart").selectAll("*").remove();

        drawBarChart(data);
        drawLineChart(data);
        drawCountryChart(data);
    }

    function drawBarChart(data) {
        let svg = d3.select("#barChart"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        let variables = ["intensity", "likelihood", "relevance"];
        let dataset = variables.map(varName => ({
            key: varName,
            value: d3.mean(data, d => d[varName])
        }));

        let xScale = d3.scaleBand()
            .domain(dataset.map(d => d.key))
            .range([0, width])
            .padding(0.2);

        let yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, d => d.value)])
            .range([height, 0]);

        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.key))
            .attr("y", d => yScale(d.value))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - yScale(d.value))
            .attr("fill", "steelblue");
    }

    function drawLineChart(data) {
        let svg = d3.select("#lineChart"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        let xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.year))
            .range([0, width]);

        let yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.intensity)])
            .range([height, 0]);

        let line = d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.intensity));

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("d", line);
    }

    function drawCountryChart(data) {
        let svg = d3.select("#countryChart"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        let countryCounts = d3.rollup(data, v => v.length, d => d.country);

        let xScale = d3.scaleBand()
            .domain(Array.from(countryCounts.keys()))
            .range([0, width])
            .padding(0.2);

        let yScale = d3.scaleLinear()
            .domain([0, d3.max(countryCounts.values())])
            .range([height, 0]);

        svg.selectAll("rect")
            .data(Array.from(countryCounts.entries()))
            .enter()
            .append("rect")
            .attr("x", d => xScale(d[0]))
            .attr("y", d => yScale(d[1]))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - yScale(d[1]))
            .attr("fill", "orange");
    }

    document.getElementById("applyFilters").addEventListener("click", applyFilters);
});
