/**
 * Radar chart — renders the Spider/radar chart via Chart.js.
 * Datasets: up to 4 selected role benchmarks + the current user's assessment.
 */

const ROLE_COLORS = [
  { border: "#ef4444", bg: "rgba(239,68,68,0.12)" },
  { border: "#22c55e", bg: "rgba(34,197,94,0.12)" },
  { border: "#f97316", bg: "rgba(249,115,22,0.12)" },
  { border: "#a855f7", bg: "rgba(168,85,247,0.12)" },
]

const USER_COLOR = { border: "#3b82f6", bg: "rgba(59,130,246,0.18)" }

let _chart = null

function updateChart() {
  const fw = getFramework()
  const assessment = getUserAssessment(fw)
  const datasets = _buildDatasets(fw, assessment)

  const ctx = document.getElementById("chart").getContext("2d")
  if (_chart) {
    _chart.destroy()
    _chart = null
  }

  _chart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: fw.categories.map((c) => c.name),
      datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: fw.maxRank,
          ticks: {
            stepSize: 1,
            backdropColor: "transparent",
            font: { size: 11 },
            color: "#8a9aaa",
          },
          pointLabels: {
            font: { size: 13, weight: "600" },
            color: "#dbd2bc",
          },
          grid: { color: "rgba(255,255,255,0.08)" },
          angleLines: { color: "rgba(255,255,255,0.12)" },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: { usePointStyle: true, padding: 16, font: { size: 12 } },
        },
      },
    },
  })
}

function _buildDatasets(fw, assessment) {
  const datasets = []

  state.selectedRoles.forEach((label, i) => {
    const role = fw.roles.find((r) => r.label === label)
    if (!role) return
    const color = ROLE_COLORS[i % ROLE_COLORS.length]
    datasets.push({
      label,
      data: role.rank,
      borderColor: color.border,
      backgroundColor: color.bg,
      fill: true,
      pointRadius: 2,
      borderWidth: 2,
    })
  })

  if (assessment && assessment.some((v) => v > 0)) {
    datasets.push({
      label: state.activeUser || "Assessment",
      data: assessment,
      borderColor: USER_COLOR.border,
      backgroundColor: USER_COLOR.bg,
      fill: true,
      borderWidth: 2,
      pointRadius: 5,
    })
  }

  return datasets
}
