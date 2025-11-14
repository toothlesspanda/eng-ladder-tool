const FRAMEWORK_LEVELS = JSON.parse(localStorage.getItem("framework-levels"));
let CUSTOM_LEVELS = JSON.parse(localStorage.getItem("custom-levels"));
let showCustom = true;

let initialData = showCustom ? CUSTOM_LEVELS : FRAMEWORK_LEVELS;
const selectedLevels = [];
let USERDATA = {
  framework: Array(FRAMEWORK_LEVELS.categories.length).fill(0),
  custom: Array(CUSTOM_LEVELS.categories.length).fill(0),
};

(async function () {
  $("#toggle-levels-baseline").change(function () {
    showCustom = $(this).prop("checked");
    initialData = showCustom ? CUSTOM_LEVELS : FRAMEWORK_LEVELS;

    reloadView();
  });

  initialRenderTemplates();
  renderChart(initialData.categories, initialData.maxRank, []);
})();

function reloadView() {
  let levelsFilteredbySelection = initialData.levels.filter((x) =>
    selectedLevels.includes(x.label)
  );

  const datasets = levelsFilteredbySelection.map((level) => {
    return { label: level.label, data: level.rank, order: 1, fill: false };
  });

  let userDataset = showCustom ? USERDATA.custom : USERDATA.framework;

  datasets.push({ label: "user", data: userDataset });
  levelsFilteredbySelection.push({ label: "user", rank: userDataset });

  renderLevelsTable(initialData.categories, levelsFilteredbySelection);
  renderUserData(initialData.categories);
  renderChart(initialData.categories, initialData.maxRank, datasets);
}
