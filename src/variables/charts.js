// ##############################
// // // Charts used in Dahsboard view
// #############################

var delays2 = 80,
  durations2 = 500;

// ##############################
// // // Simple Bar Chart
// #############################

const simpleBarChart = {
  options: {
    seriesBarDistance: 10,
    axisX: {
      showGrid: false
    }
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 6,
        reverseData: true,
        horizontalBars: true,
        axisY: {
          labelInterpolationFnc: function(value) {
            return value[0];
          }
        }
      }
    ]
  ],
  animation: {
    draw: function(data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};

module.exports = {
  // Charts used in Dahsboard view
  simpleBarChart
};
