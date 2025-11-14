window.Handlebars.registerHelper("times", function (block) {
  var accum = "";

  for (var i = 0; i < initialData.maxRank; ++i) accum += block.fn(i);

  return accum;
});

function addUserData(e) {
  console.log(e);
}
