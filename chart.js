let chart = null;

function renderChart(labels, maxRank, datasets) {
  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("chart").getContext("2d"), {
    type: "radar",
    options: {
      maintainAspectRatio: true,
      responsive: true,
      layout: {
        autoPadding: true,
      },
      scales: {
        r: {
          beginAtZero: true,
          suggestedMin: 0,
          suggestedMax: maxRank,
          min: 0,
          max: maxRank,
          ticks: {
            maxTicksLimit: maxRank + 1,
            stepSize: 1,
          },
        },
      },
    },
    data: {
      labels: labels,
      datasets: datasets,
    },
  });
}
