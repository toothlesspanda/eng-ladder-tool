(function () {
  var template = Handlebars.template,
    templates = (Handlebars.templates = Handlebars.templates || {});
  templates["levels-table"] = template({
    1: function (container, depth0, helpers, partials, data) {
      var lookupProperty =
        container.lookupProperty ||
        function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };

      return (
        '<th scope="col">' +
        container.escapeExpression(
          container.lambda(
            depth0 != null ? lookupProperty(depth0, "name") : depth0,
            depth0
          )
        ) +
        "</th>\n"
      );
    },
    3: function (container, depth0, helpers, partials, data) {
      var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        "        <tr>\n          <td>" +
        container.escapeExpression(
          ((helper =
            (helper =
              lookupProperty(helpers, "label") ||
              (depth0 != null ? lookupProperty(depth0, "label") : depth0)) !=
            null
              ? helper
              : container.hooks.helperMissing),
          typeof helper === "function"
            ? helper.call(alias1, {
                name: "label",
                hash: {},
                data: data,
                loc: {
                  start: { line: 13, column: 14 },
                  end: { line: 13, column: 23 },
                },
              })
            : helper)
        ) +
        "</td>\n" +
        ((stack1 = lookupProperty(helpers, "each").call(
          alias1,
          depth0 != null ? lookupProperty(depth0, "rank") : depth0,
          {
            name: "each",
            hash: {},
            fn: container.program(4, data, 0),
            inverse: container.noop,
            data: data,
            loc: {
              start: { line: 14, column: 10 },
              end: { line: 16, column: 19 },
            },
          }
        )) != null
          ? stack1
          : "") +
        "        </tr>\n"
      );
    },
    4: function (container, depth0, helpers, partials, data) {
      return (
        "            <td>" +
        container.escapeExpression(container.lambda(depth0, depth0)) +
        "</td>\n"
      );
    },
    compiler: [8, ">= 4.3.0"],
    main: function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '<table class="table table-sm">\n  <thead>\n    <tr>\n       <th scope="col">Level</th>\n' +
        ((stack1 = lookupProperty(helpers, "each").call(
          alias1,
          depth0 != null ? lookupProperty(depth0, "categories") : depth0,
          {
            name: "each",
            hash: {},
            fn: container.program(1, data, 0),
            inverse: container.noop,
            data: data,
            loc: {
              start: { line: 5, column: 6 },
              end: { line: 7, column: 15 },
            },
          }
        )) != null
          ? stack1
          : "") +
        "    </tr>\n  </thead>\n  <tbody>\n" +
        ((stack1 = lookupProperty(helpers, "each").call(
          alias1,
          depth0 != null ? lookupProperty(depth0, "levels") : depth0,
          {
            name: "each",
            hash: {},
            fn: container.program(3, data, 0),
            inverse: container.noop,
            data: data,
            loc: {
              start: { line: 11, column: 6 },
              end: { line: 18, column: 15 },
            },
          }
        )) != null
          ? stack1
          : "") +
        "  </tbody>\n</table>"
      );
    },
    useData: true,
  });
})();
