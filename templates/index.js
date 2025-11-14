const templates = Handlebars.templates;

function initialRenderTemplates() {
  renderLevelsSelector(initialData.categories, initialData.levels);
  renderLevelsTable(initialData.categories, []);
  renderUserData(initialData.categories, initialData.maxRank);
}

function renderLevelsSelector(categories, levels) {
  document.getElementById("levels-dropdown").innerHTML = templates[
    "levels-selector"
  ]({
    categories: categories,
    levels: levels,
  });

  const levelsSelector = $("#levels-selector");

  levelsSelector.select2({ closeOnSelect: false, maximumSelectionLength: 4 });
  levelsSelector.on("select2:select", function (e) {
    selectedLevels.push(e.params.data.id);

    reloadView();
  });

  levelsSelector.on("select2:unselect", function (e) {
    const index = selectedLevels.indexOf(e.params.data.id);
    selectedLevels.splice(index, 1);
    reloadView();
  });
}

function renderLevelsTable(categories, levels) {
  console.log(templates);
  document.getElementById("levels-explain").innerHTML = templates[
    "levels-table"
  ]({
    categories: categories,
    levels: levels,
  });
}

function renderLevelsSelector(categories, levels) {
  console.log(templates);
  document.getElementById("levels-explain").innerHTML = templates[
    "levels-table"
  ]({
    categories: categories,
    levels: levels,
  });
}

function renderUserData(categories) {
  document.getElementById("user-data").innerHTML = templates["user-data"]({
    categories: categories,
    maxRank: 6,
    customOrFramework: showCustom ? "custom" : "framework",
  });

  const userDataSelector = $(".user-data-selector");

  userDataSelector.select2({
    closeOnSelect: true,
    width: "50px",
  });

  userDataSelector.on("select2:select", function (e) {
    const currentCategory = e.currentTarget.id;
    const rank = parseInt(e.params.data.id);
    console.log(e);
    const categoryIndex = initialData.categories.indexOf(currentCategory);
    if (showCustom) USERDATA.custom[categoryIndex] = rank;
    else USERDATA.framework[categoryIndex] = rank;
    console.log(USERDATA);
    localStorage.setItem("userData", USERDATA);
    reloadView();
  });
}
