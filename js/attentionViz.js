d3.csv('data.csv', function(data) {
  chart = new TextChart(data, {useColor: false});
  chart.draw("text-container");
});
