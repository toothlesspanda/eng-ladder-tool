(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['user-data'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }, buffer = 
  "      <div class=\"row\">\n        <div class=\"col-3 display-flex-start\">\n          <label for="
    + alias2(alias1(depth0, depth0))
    + " class=\"col-sm-2 col-form-label\">"
    + alias2(alias1(depth0, depth0))
    + "</label>\n        </div>\n        <div class=\"col-2 display-flex-start\">\n          <select title="
    + alias2(alias1(depth0, depth0))
    + " id="
    + alias2(alias1(depth0, depth0))
    + " class=\"form-selec user-data-selector\" aria-label=\"Default select example\">\n";
  stack1 = ((helper = (helper = lookupProperty(helpers,"times") || (depth0 != null ? lookupProperty(depth0,"times") : depth0)) != null ? helper : container.hooks.helperMissing),(options={"name":"times","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":12},"end":{"line":14,"column":22}}}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!lookupProperty(helpers,"times")) { stack1 = container.hooks.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "          </select>\n        </div>\n      </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "              <option value="
    + alias2(alias1(depth0, depth0))
    + ">"
    + alias2(alias1(depth0, depth0))
    + "</option>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<h1>User</h1>\n<div class=\"row justify-content-md-start\">\n  <divv class=\"col\">\n    "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"customOrFramework") || (depth0 != null ? lookupProperty(depth0,"customOrFramework") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"customOrFramework","hash":{},"data":data,"loc":{"start":{"line":4,"column":4},"end":{"line":4,"column":25}}}) : helper)))
    + "\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"categories") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":4},"end":{"line":18,"column":13}}})) != null ? stack1 : "")
    + "    <div class=\"row\">\n      <div class=\"col-2 display-flex-start\">\n        <button class=\"form-control\" type=\"button\" onclick=\"addUserData()\"> Add</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n";
},"useData":true});
})();