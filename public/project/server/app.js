/**
 * Created by Josceyn on 3/14/2016.
 */
module.exports = function(app) {
    var model   = require("./models/user.model.server.js")();
    var service = require("./services/user.service.server.js")(app, model);
    require("./services/products.service.server.js")(app);
}